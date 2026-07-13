import * as vscode from "vscode"
import { ContextExtractor } from "../ContextExtractor";


export class ClassExtractor implements
ContextExtractor<string | undefined> {
    
    extract(document: vscode.TextDocument, position: vscode.Position): string | undefined {
        const text = document.getText();
        const match = text.match(
            /class\s+([A-Za-z0-9_]+)/
        );
        return match?.[1];

    }
    
}