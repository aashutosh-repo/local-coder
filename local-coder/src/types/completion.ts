export interface CompletionRequest {
    language: string;
    prefix: string;
    suffix: string;
}

export interface CompletionResponse {
    completion: string;
}