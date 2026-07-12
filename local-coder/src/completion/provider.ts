import * as vscode from "vscode";

import { getCompletion } from "../api/client";
import { extractContext } from "../context/extractor";
import {
    getCachedCompletion,
    saveCompletion
} from "./cache";
import { log } from "../utils/logger";
import { Debouncer } from "./debounce";
import { CompletionScheduler } from "./scheduler";

const SUPPORTED_LANGUAGES = [
    "java",
    "javascript",
    "typescript",
    "python",
    "go",
    "cpp",
    "csharp"
];

export class LocalCopilotProvider
    implements vscode.InlineCompletionItemProvider {

    private scheduler = new CompletionScheduler();


    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {

        if (!SUPPORTED_LANGUAGES.includes(document.languageId)) {
            return [];
        }

        const { prefix, suffix } = extractContext(
            document,
            position
        );

        if (prefix.trim().length < 5) {
            return [];
        }

        const cacheKey = prefix + suffix;

        const cached = getCachedCompletion(cacheKey);

        if (cached) {

            log("Cache hit");

            return [
                new vscode.InlineCompletionItem(
                    cached,
                    new vscode.Range(position, position)
                )
            ];
        }

        try {

            // const completion = await getCompletion({
            //     language: document.languageId,
            //     prefix,
            //     suffix
            // });
            const completion = await this.scheduler.schedule(
                signal =>
                    getCompletion({
                        language: document.languageId,
                        prefix,
                        suffix
                    },  signal
                ),
                250
            );

            if (!completion.trim()) {
                return [];
            }

            saveCompletion(
                cacheKey,
                completion
            );

            log("AI:", completion);

            const item = new vscode.InlineCompletionItem(
                completion
            );

            item.range = new vscode.Range(position, position);
            item.filterText = completion;

            return [item];

        } catch (err) {
            if(err instanceof Error){

                if(err.name==="AbortError"){

                    return [];

                }

                if(err.message==="Stale completion"){

                    return [];

                }

            }

            console.error(err);

            return [];
        }
    }
}