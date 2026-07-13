import * as vscode from "vscode"
import { ContextExtractor } from "../ContextExtractor";


export class PackageExtractor implements
ContextExtractor<string | undefined> {


    extract(document: vscode.TextDocument): string | undefined {
        const text = document.getText();
        const match = text.match(/package\s+([w.]+);/);
        return match?.[1];
    }
    
}