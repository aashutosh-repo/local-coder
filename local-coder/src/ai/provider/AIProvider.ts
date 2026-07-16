import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

export interface AIProvider {

    execute(

        request: AIRequest,

        signal?: AbortSignal

    ): Promise<AIResponse>;

}