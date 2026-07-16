import { PromptContext } from "../../api/models/PromptContext";
import { AIRequest } from "../../ai/models/AIRequest";

export interface IPromptStrategy {
    build(request: AIRequest): PromptContext;
}
