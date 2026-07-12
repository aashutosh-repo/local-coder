export interface CompletionRequest {
    language: string;
    prefix: string;
    suffix: string;
}

export interface CompletionResponse {
    completion: string;
}

const API_URL = "http://127.0.0.1:8000/complete";

export async function getCompletion(
    request: CompletionRequest
): Promise<string> {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json() as CompletionResponse;

    return data.completion;
}