import * as vscode from "vscode";
import { FileInfo } from "../models/FileInfo";

export class WorkspaceExtractor {

    async extract(): Promise<FileInfo[]> {

        const files: FileInfo[] = [];

        const uris = await vscode.workspace.findFiles(
            "**/*.{java,ts,js,py,go,cs,cpp,c,h,hpp}",
            "**/{node_modules,target,bin,obj,dist,.git}/**"
        );

        for (const uri of uris) {

            const document = await vscode.workspace.openTextDocument(uri);

            files.push({

                path: uri.fsPath,

                name: uri.path.split("/").pop() ?? "",

                language: document.languageId

            });

        }

        return files;

    }

}