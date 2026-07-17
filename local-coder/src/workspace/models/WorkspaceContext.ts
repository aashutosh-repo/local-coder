import { SymbolInfo } from "./SymbolInfo";
import { FileInfo } from "./FileInfo";

export interface WorkspaceContext {

    files: FileInfo[];
    symbols: SymbolInfo[];
    openEditors: string[];

}