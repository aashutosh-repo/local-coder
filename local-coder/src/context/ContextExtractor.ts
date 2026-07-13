import * as vscode from "vscode";

export interface ContextExtractor<T> {
    
    extract(
        document: vscode.TextDocument,
        position: vscode.Position
    ): T;
}