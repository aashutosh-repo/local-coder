import * as vscode from "vscode";
import { LocalCopilotProvider } from "./completion/provider";

export function activate(context: vscode.ExtensionContext) {

    console.log("Local Copilot Activated");

    const provider = vscode.languages.registerInlineCompletionItemProvider(
        { language: "java", scheme: "file" },
        new LocalCopilotProvider()
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}