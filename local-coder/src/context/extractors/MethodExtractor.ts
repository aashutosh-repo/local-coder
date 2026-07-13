import * as vscode from "vscode"
import { ContextExtractor } from "../ContextExtractor";


export class MethodExtractor implements ContextExtractor<string | undefined> {
    
    extract(document: vscode.TextDocument, position: vscode.Position): string | undefined {
        for(
            let line = position.line;
            line >=0;
            line--
        ) {
            const text = document.lineAt(line).text;
            const match = text.match(
                /([A-Za-z0-9_]+)\s*\(,*\)\s+{?/
            )
            if(match){
                return match[1];
            }
        }
        return undefined;
    }
    
}