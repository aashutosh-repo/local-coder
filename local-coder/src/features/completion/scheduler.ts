export class CompletionScheduler {

    private debounceTimer?: NodeJS.Timeout;

    private controller?: AbortController;

    private requestId = 0;

    async schedule<T>(
        task: (signal: AbortSignal) => Promise<T>,
        delay = 250
    ): Promise<T> {

        this.requestId++;

        const currentRequest = this.requestId;

        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        return new Promise((resolve, reject) => {

            this.debounceTimer = setTimeout(async () => {

                try {

                    const result = await task(this.controller!.signal);

                    if (currentRequest !== this.requestId) {
                        reject(new Error("Stale completion"));
                        return;
                    }

                    resolve(result);

                } catch (err) {

                    reject(err);

                }

            }, delay);

        });

    }

}