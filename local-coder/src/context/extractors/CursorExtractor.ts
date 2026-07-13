import * as vscode from "vscode";
import { ContextExtractor } from "../ContextExtractor";

export interface CursorContext {
    prefix: string;
    suffix: string;
}

export class CursorExtractor
    implements ContextExtractor<CursorContext> {

    private readonly PREFIX_LINES = 100;

    private readonly SUFFIX_LINES = 20;

    extract(
        document: vscode.TextDocument,
        position: vscode.Position
    ): CursorContext {

        const fullPrefix = document.getText(
            new vscode.Range(
                new vscode.Position(0, 0),
                position
            )
        );

        const prefix = fullPrefix
            .split(/\r?\n/)
            .slice(-this.PREFIX_LINES)
            .join("\n");

        const fullSuffix = document.getText(
            new vscode.Range(
                position,
                document.positionAt(document.getText().length)
            )
        );

        const suffix = fullSuffix
            .split(/\r?\n/)
            .slice(0, this.SUFFIX_LINES)
            .join("\n");

        return {
            prefix,
            suffix
        };
    }
}