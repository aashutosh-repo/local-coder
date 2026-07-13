import * as vscode from "vscode";
import { ContextExtractor } from "../ContextExtractor";

export class DiagnosticExtractor
implements ContextExtractor<string[]> {

    extract(
        document: vscode.TextDocument
    ): string[] {

        return vscode.languages
            .getDiagnostics(document.uri)
            .map(d => d.message);

    }

}