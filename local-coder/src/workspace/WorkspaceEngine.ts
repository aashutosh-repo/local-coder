import { WorkspaceExtractor } from "./extractors/WorkspaceExtractor";
import { SymbolExtractor } from "./extractors/SymbolExtractor";
import { OpenEditorsExtractor } from "./extractors/OpenEditorsExtractor";

import { WorkspaceContext } from "./models/WorkspaceContext";

export class WorkspaceEngine {

    private readonly workspaceExtractor = new WorkspaceExtractor();
    private readonly symbolExtractor = new SymbolExtractor();
    private readonly openEditorsExtractor = new OpenEditorsExtractor();

    async build(): Promise<WorkspaceContext> {

        const files = await this.workspaceExtractor.extract();
        const symbols = await this.symbolExtractor.extract();
        const openEditors = this.openEditorsExtractor.extract();

        return {
            files,
            symbols,
            openEditors

        };
    }
}