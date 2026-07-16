import * as vscode from "vscode";

export class SymbolExtractor {

    async extract(
        document: vscode.TextDocument
    ): Promise<string[]> {

        const symbols =
            await vscode.commands.executeCommand
            <vscode.DocumentSymbol[]>(

                "vscode.executeDocumentSymbolProvider",

                document.uri

            );

        if (!symbols) {

            return [];

        }

        const result: string[] = [];

        this.collect(
            symbols,
            result
        );

        return result;

    }

    private collect(

        symbols: vscode.DocumentSymbol[],

        output: string[]

    ) {

        for (const symbol of symbols) {

            output.push(symbol.name);

            if (symbol.children.length) {

                this.collect(

                    symbol.children,

                    output

                );

            }

        }

    }

}