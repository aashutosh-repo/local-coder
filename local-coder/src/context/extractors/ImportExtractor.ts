import * as vscode from "vscode"
import { ContextExtractor } from "../ContextExtractor";


export class ImportExtractor implements ContextExtractor<string[]> {

    extract(document: vscode.TextDocument): string[] {
        const text = document.getText();
        return text.split("\n")
                    .filter(line => line.trim().startsWith("inport "))
                    .map(line => line.trim());
    }
    
}