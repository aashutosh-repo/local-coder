import { PromptContext } from "../../api/models/PromptContext";
import { CompletionContext } from "../../context/models/CompletionContext";
import { TaskType } from "./TaskType";

export interface AIRequest {

    task: TaskType;

    context: CompletionContext;

    prompt?: PromptContext;

    temperature?: number;

    maxTokens?: number;

}