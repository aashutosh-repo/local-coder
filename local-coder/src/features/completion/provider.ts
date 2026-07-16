import * as vscode from "vscode";

import { getCompletion } from "../../api/client";
import { log } from "../../utils/logger";
import { CompletionScheduler } from "./scheduler";
import { ContextEngine } from "../../context/ContextEngine";
import { CompletionCache } from "./cache/CompletionCache";
import { CompletionManager } from "../../core/completionManager";

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

    private readonly manager = new CompletionManager();

    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {

        return this.manager.complete(
            document,
            position
        );        
    }
}