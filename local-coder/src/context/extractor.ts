import * as vscode from "vscode";

export function extractContext(
    document: vscode.TextDocument,
    position: vscode.Position
) {

    const before = document.getText(
        new vscode.Range(
            new vscode.Position(0, 0),
            position
        )
    );

    const after = document.getText(
        new vscode.Range(
            position,
            document.positionAt(document.getText().length)
        )
    );

    return {

        prefix: before
            .split("\n")
            .slice(-100)
            .join("\n"),

        suffix: after
            .split("\n")
            .slice(0, 20)
            .join("\n")
    };
}