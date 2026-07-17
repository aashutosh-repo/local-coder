import * as vscode from "vscode";

export class OpenEditorsExtractor {

    extract(): string[] {

        const editors = vscode.window.visibleTextEditors;

        return editors.map(
            editor => editor.document.fileName
        );

    }

}