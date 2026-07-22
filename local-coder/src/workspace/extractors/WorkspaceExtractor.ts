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
            const path = uri.fsPath.toLowerCase();
            const extension = path.split(".").pop() ?? "";

            files.push({
                path: uri.fsPath,
                name: uri.path.split("/").pop() ?? "",
                language: this.inferLanguage(extension)
            });
        }

        return files;
    }

    private inferLanguage(extension: string): string {
        switch (extension) {
            case "ts":
            case "tsx":
                return "typescript";
            case "js":
            case "jsx":
                return "javascript";
            case "py":
                return "python";
            case "go":
                return "go";
            case "java":
                return "java";
            case "cs":
                return "csharp";
            case "cpp":
            case "cc":
            case "cxx":
                return "cpp";
            case "c":
                return "c";
            case "h":
            case "hpp":
                return "cpp";
            default:
                return "plaintext";
        }
    }

}