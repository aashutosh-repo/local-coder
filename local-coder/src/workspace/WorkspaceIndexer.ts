import { workspace } from 'vscode';
import { WorkspaceEngine} from './WorkspaceEngine';
import { WorkspaceStore } from './WorkspaceStore';

export class WorkspaceIndexer {
    
    constructor(
        private readonly workspaceEngine: WorkspaceEngine,
        private readonly workspaceStore: WorkspaceStore
    ) {}
    
    async initialize(): Promise<void> {
        console.log("Building workspace index...");

        const workspace =  await this.workspaceEngine.build();
        this.workspaceStore.set(workspace);
    }

}