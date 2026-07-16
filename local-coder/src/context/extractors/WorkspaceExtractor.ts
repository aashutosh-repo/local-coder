import * as vscode from "vscode";

export class WorkspaceExtractor {

    extract(document: vscode.TextDocument) {

        const workspaceFolder =
            vscode.workspace.getWorkspaceFolder(
                document.uri
            );

        if (!workspaceFolder) {

            return {

                workspaceName: undefined,

                relativePath: document.fileName

            };

        }

        const relativePath =
            vscode.workspace.asRelativePath(
                document.uri
            );

        return {
            workspaceName: workspaceFolder.name, relativePath
        };

    }

}