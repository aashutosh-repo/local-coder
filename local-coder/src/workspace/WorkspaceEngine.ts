import { WorkspaceExtractor } from "./extractors/WorkspaceExtractor";
import { SymbolExtractor } from "./extractors/SymbolExtractor";
import { OpenEditorsExtractor } from "./extractors/OpenEditorsExtractor";

import { WorkspaceContext } from "./models/WorkspaceContext";

export class WorkspaceEngine {

    private readonly workspaceExtractor: WorkspaceExtractor;
    private readonly symbolExtractor: SymbolExtractor;
    private readonly openEditorsExtractor: OpenEditorsExtractor;

    constructor(
        workspaceExtractor?: WorkspaceExtractor,
        symbolExtractor?: SymbolExtractor,
        openEditorsExtractor?: OpenEditorsExtractor
    ) {
        this.workspaceExtractor = workspaceExtractor ?? new WorkspaceExtractor();
        this.symbolExtractor = symbolExtractor ?? new SymbolExtractor();
        this.openEditorsExtractor = openEditorsExtractor ?? new OpenEditorsExtractor();
    }

    async build(): Promise<WorkspaceContext> {

        const files = await this.workspaceExtractor.extract();
        const openEditors = this.openEditorsExtractor.extract();

        return {
            files,
            symbols: [],
            openEditors

        };
    }
}