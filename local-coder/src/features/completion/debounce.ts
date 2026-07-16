export class Debouncer {

    private timer?: NodeJS.Timeout;

    debounce<T>(
        fn: () => Promise<T>,
        delay: number
    ): Promise<T> {

        if (this.timer) {
            clearTimeout(this.timer);
        }

        return new Promise(resolve => {

            this.timer = setTimeout(async () => {

                const result = await fn();

                resolve(result);

            }, delay);

        });

    }

}