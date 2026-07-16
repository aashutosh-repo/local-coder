export interface CompletionContext {

    language: string;

    fileName: string;

    packageName?: string;

    imports: string[];

    className?: string;

    methodName?: string;

    prefix: string;

    suffix: string;

    diagnostics: string[];

    workspaceName?: string;

    relativePath?: string;

    openFiles: string[];

    symbols: string[];

}