export interface AIResponse {

    content: string;

    finishReason?: string;

    promptTokens?: number;

    completionTokens?: number;

    totalTokens?: number;

    duration?: number;

}