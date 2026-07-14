export interface CompletionRequest {
    language: string;
    prompt: string;
}

export interface CompletionResponse {
    completion: string;
}