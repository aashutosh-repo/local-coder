import * as vscode from "vscode";

export class OpenEditorsExtractor {

    extract(): string[] {

        const files = new Set<string>();

        vscode.window.visibleTextEditors.forEach(editor => {

            files.add(

                vscode.workspace.asRelativePath(
                    editor.document.uri
                )

            );

        });

        return [...files];

    }

}