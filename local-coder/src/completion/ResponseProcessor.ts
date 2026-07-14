import { CompletionContext } from "../context/models/CompletionContext";

export class ResponseProcessor {

    process(
        completion: string,
        context: CompletionContext
    ): string {

        let result = completion;

        result = this.removeMarkdown(result);
        result = this.removePackage(result);
        result = this.removeImports(result);

        result = this.removeDuplicatePrefix(
            result,
            context.prefix
        );

        result = this.removeDuplicateSuffix(
            result,
            context.suffix
        );

        result = this.normalizeWhitespace(result);

        return result;
    }

    private removeMarkdown(text: string): string {

        return text
            .replace(/```[a-zA-Z]*/g, "")
            .replace(/```/g, "");

    }

    private removePackage(text: string): string {

        return text.replace(
            /^package\s+.*?;\s*/gm,
            ""
        );

    }

    private removeImports(text: string): string {

        return text.replace(
            /^import\s+.*?;\s*/gm,
            ""
        );

    }

    private removeDuplicatePrefix(
        completion: string,
        prefix: string
    ): string {

        const lastLine = prefix
            .split(/\r?\n/)
            .pop()
            ?.trim() ?? "";

        if (!lastLine) {
            return completion;
        }

        if (completion.startsWith(lastLine)) {

            return completion.substring(lastLine.length);

        }

        return completion;

    }

    private removeDuplicateSuffix(
        completion: string,
        suffix: string
    ): string {

        const firstLine = suffix
            .split(/\r?\n/)[0]
            .trim();

        if (!firstLine) {
            return completion;
        }

        if (completion.endsWith(firstLine)) {

            return completion.substring(
                0,
                completion.length - firstLine.length
            );

        }

        return completion;

    }

    private normalizeWhitespace(
        text: string
    ): string {

        return text
            .replace(/\r/g, "")
            .trim();

    }

}