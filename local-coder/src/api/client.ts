import { CompletionRequest, CompletionResponse } from "../types/completion";

const API_URL = "http://localhost:8000/complete";

export async function getCompletion(
    request: CompletionRequest, signal?: AbortSignal
): Promise<string> {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request), signal
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
    const data = await response.json();

    if (
        typeof data !== "object" ||
        data === null ||
        !("completion" in data)
    ) {
        throw new Error("Invalid response from backend");
    }

    return (data as CompletionResponse).completion;
}