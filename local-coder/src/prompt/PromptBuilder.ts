import { PromptContext } from "../api/models/PromptContext";
import { AIRequest } from "../ai/models/AIRequest";
import { TaskType } from "../ai/models/TaskType";
import { IPromptStrategy } from "./strategies/IPromptStrategy";
import { CompletionPromptStrategy } from "./strategies/CompletionPromptStrategy";
import { ChatPromptStrategy } from "./strategies/ChatPromptStrategy";
import { EditPromptStrategy } from "./strategies/EditPromptStrategy";

export class PromptBuilder {

    private strategies: Map<TaskType, IPromptStrategy> = new Map([
        [TaskType.COMPLETION, new CompletionPromptStrategy()],
        [TaskType.CHAT, new ChatPromptStrategy()],
        [TaskType.EDIT, new EditPromptStrategy()]
    ]);

    build(request: AIRequest): PromptContext {

        const strategy = this.strategies.get(request.task) 
            || this.strategies.get(TaskType.COMPLETION);

        if (!strategy) {
            throw new Error(`No strategy found for task type: ${request.task}`);
        }

        return strategy.build(request);

    }

}