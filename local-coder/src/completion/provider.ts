import * as vscode from "vscode";

import { getCompletion } from "../api/client";
import { log } from "../utils/logger";
import { CompletionScheduler } from "./scheduler";
import { ContextEngine } from "../context/ContextEngine";
import { CompletionCache } from "./cache/CompletionCache";

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
    private contextEngine = new ContextEngine();
    private cache = new CompletionCache();


    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {

        if (!SUPPORTED_LANGUAGES.includes(document.languageId)) {
            return [];
        }

        // const { prefix, suffix } = ContextExtractor(
        //     document,
        //     position
        // );
        const context = this.contextEngine.build(
            document,
            position
        );

        // if (prefix.trim().length < 5) {
        //     return [];
        // }

        const cacheKey = JSON.stringify(context);

        const cached = this.cache.get(context);

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
            const completion = await this.scheduler.schedule(
                signal =>
                    getCompletion(context, signal),
                250
            );

            if (!completion.trim()) {
                return [];
            }

            this.cache.put(
                context,
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