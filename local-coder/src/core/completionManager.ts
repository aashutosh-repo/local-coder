import * as vscode from "vscode";

import { ContextEngine } from "../context/ContextEngine";
import { CompletionCache } from "../features/completion/cache/CompletionCache";
import { ResponseProcessor } from "../features/completion/ResponseProcessor";

import { AIRequest } from "../ai/models/AIRequest";
import { TaskType } from "../ai/models/TaskType";
import { AIRequestManager } from "../ai/manager/AIRequestManager";

export class CompletionManager {

    private readonly contextEngine = new ContextEngine();

    private readonly cache = new CompletionCache();

    private readonly responseProcessor =
        new ResponseProcessor();

    private readonly requestManager =
        new AIRequestManager();

    async complete(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {

        const context =
            await this.contextEngine.build(
                document,
                position
            );

        const cached =
            this.cache.get(context);

        if (cached) {

            return [

                new vscode.InlineCompletionItem(
                    cached,
                    new vscode.Range(position, position)
                )

            ];

        }

        const request: AIRequest = {

            task: TaskType.COMPLETION,

            context,

            temperature: 0.2,

            maxTokens: 128

        };

        const response =
            await this.requestManager.execute(request);

        const processed =
            this.responseProcessor.process(
                response.content,
                context
            );

        this.cache.put(
            context,
            processed
        );

        return [

            new vscode.InlineCompletionItem(
                processed,
                new vscode.Range(position, position)
            )

        ];

    }

}