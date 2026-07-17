import * as vscode from "vscode";
import { SymbolInfo } from "../models/SymbolInfo";

export class SymbolExtractor {

    async extract(): Promise<SymbolInfo[]> {

        const result: SymbolInfo[] = [];

        const uris = await vscode.workspace.findFiles(
            "**/*.{java,ts,js,py,go,cs,cpp}"
        );

        for (const uri of uris) {

            try {

                const symbols =
                    await vscode.commands.executeCommand<
                        vscode.DocumentSymbol[]
                    >(
                        "vscode.executeDocumentSymbolProvider",
                        uri
                    );

                if (!symbols) {
                    continue;
                }

                this.collectSymbols(
                    symbols,
                    uri.fsPath,
                    result
                );
            } catch (err) {
                console.error(err);
            }
        }
        return result;

    }

    private collectSymbols(

        symbols: vscode.DocumentSymbol[],
        file: string,
        result: SymbolInfo[]

    ) {

        for (const symbol of symbols) {

            result.push({
                name: symbol.name,
                kind: vscode.SymbolKind[symbol.kind],
                file
            });

            this.collectSymbols(
                symbol.children,
                file,
                result
            );

        }

    }

}