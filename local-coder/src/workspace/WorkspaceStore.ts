import { WorkspaceContext } from './models/WorkspaceContext';


export class WorkspaceStore {
    private workspace?: WorkspaceContext;

    set(workspace: WorkspaceContext) :void{
        this.workspace = workspace;
    }

    get() : WorkspaceContext | undefined {
        return this.workspace;
    }
    
    clear(): void {
        this.workspace = undefined;
    }

}
