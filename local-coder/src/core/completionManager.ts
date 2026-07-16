import * as vscode from "vscode";

import { ContextEngine } from "../context/ContextEngine";
import { CompletionScheduler } from "../features/completion/scheduler";
import { CompletionCache } from "../features/completion/cache/CompletionCache";
import { ResponseProcessor } from "../features/completion/ResponseProcessor";
import { getCompletion } from "../api/client";
import { PromptBuilder } from "../prompt/PromptBuilder";

export class CompletionManager {

    private readonly contextEngine = new ContextEngine();
    private readonly promptBuilder = new PromptBuilder();
    private readonly scheduler = new CompletionScheduler();

    private readonly cache = new CompletionCache();

    private readonly responseProcessor = new ResponseProcessor();

    async complete(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {


        const context = await this.contextEngine.build(
            document,
            position
        );

        const context6 = this.contextEngine

        const prompt = this.promptBuilder.build(context);
        const cached = this.cache.get(context);

        if (cached) {

            return [

                new vscode.InlineCompletionItem(
                    cached,
                    new vscode.Range(position, position)
                )

            ];

        }

        const completion = await this.scheduler.schedule(
            signal =>
                getCompletion(
                    prompt,
                    signal
                ),
            250
        );
        const processed = this.responseProcessor.process(
            completion,
            context
        );

        this.cache.put(context, processed);
        return [
            new vscode.InlineCompletionItem(
                processed, new vscode.Range(position,position)
            )
        ]
    }
}