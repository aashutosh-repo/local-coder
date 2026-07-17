import { AIProvider } from "./AIProvider";
import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";
import { getCompletion } from "../../api/client";

export class OllamaProvider implements AIProvider {

    async execute( request: AIRequest, signal?: AbortSignal ): Promise<AIResponse> {

        const completion = await getCompletion(
                request, signal
            );
        return {
            content: completion
        };

    }
}