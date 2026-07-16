import * as vscode from "vscode"
import { ClassExtractor } from "./extractors/ClassExtractor";
import { DiagnosticExtractor } from "./extractors/DiagnosticExtractor";
import { ImportExtractor } from "./extractors/ImportExtractor";
import { MethodExtractor } from "./extractors/MethodExtractor";
import { PackageExtractor } from "./extractors/PackageExtractor";
import { CompletionContext } from "./models/CompletionContext";
import { CursorExtractor } from "./extractors/CursorExtractor";
import { WorkspaceExtractor } from "./extractors/WorkspaceExtractor";
import { OpenEditorsExtractor } from "./extractors/OpenEditorsExtractor";
import { SymbolExtractor } from "./extractors/SymbolExtractor";

export class ContextEngine {

    private packageExtractor = new PackageExtractor();

    private importExtractor = new ImportExtractor();

    private classExtractor = new ClassExtractor();

    private methodExtractor = new MethodExtractor();

    private diagnosticExtractor = new DiagnosticExtractor();

    private cursorExtractor = new CursorExtractor();
    private readonly workspaceExtractor = new WorkspaceExtractor();
    private readonly openEditorsExtractor = new OpenEditorsExtractor();
    private readonly symbolExtractor = new SymbolExtractor();

    

    async build(
        document: vscode.TextDocument,
        position: vscode.Position
    ): Promise<CompletionContext> {
        const workspace = this.workspaceExtractor.extract(document);
        const openFiles = this.openEditorsExtractor.extract();
        const symbols = await this.symbolExtractor.extract(document);

        return {

            language: document.languageId,
            fileName: document.fileName,
            packageName: this.packageExtractor.extract(document),
            imports: this.importExtractor.extract(document),
            className: this.classExtractor.extract(document, position),
            methodName: this.methodExtractor.extract(document, position),
            diagnostics: this.diagnosticExtractor.extract(document),
            relativePath: workspace.relativePath,
            workspaceName : workspace.workspaceName,
            openFiles,
            symbols,

            ...this.cursorExtractor.extract(document, position)

        };

    }

}
