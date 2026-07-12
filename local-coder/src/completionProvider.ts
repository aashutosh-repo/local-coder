import * as vscode from "vscode";
import { getCompletion } from "./api";

export class LocalCopilotProvider
    implements vscode.InlineCompletionItemProvider {

    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<vscode.InlineCompletionItem[]> {

        console.log("===== Completion Requested =====");

        // Only send the last 100 lines before the cursor
        const fullPrefix = document.getText(
            new vscode.Range(
                new vscode.Position(0, 0),
                position
            )
        );

        const prefix = fullPrefix
            .split("\n")
            .slice(-100)
            .join("\n");

        // Send only a small amount of code after the cursor
        const fullSuffix = document.getText(
            new vscode.Range(
                position,
                document.positionAt(document.getText().length)
            )
        );

        const suffix = fullSuffix
            .split("\n")
            .slice(0, 20)
            .join("\n");

        console.log("Language:", document.languageId);

        try {

            const completion = await getCompletion({
                language: document.languageId,
                prefix,
                suffix
            });
            // const completion = "out.println();";

            console.log("Completion:", completion);

            if (!completion || completion.trim().length === 0) {
                return [];
            }

            return [
                new vscode.InlineCompletionItem(
                    completion,
                    new vscode.Range(position, position)
                )
            ];

        } catch (err) {

            console.error(err);

            return [];
        }
    }
}