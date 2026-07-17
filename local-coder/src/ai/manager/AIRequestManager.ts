import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

import { PromptBuilder } from "../../prompt/PromptBuilder";
import { CompletionScheduler } from "../../features/completion/scheduler";
import { OllamaProvider } from "../provider/OllamaProvider";

export class AIRequestManager {

    private readonly promptBuilder = new PromptBuilder();
    private readonly scheduler = new CompletionScheduler();
    private readonly provider = new OllamaProvider();

    async execute(
        request: AIRequest
    ): Promise<AIResponse> {

        const prompt =
            this.promptBuilder.build(request);

        const response =
            await this.scheduler.schedule(
                signal =>
                    this.provider.execute(
                        {
                            ...request,
                            prompt
                        },
                        signal
                    ),
                250
            );

        return response;

    }

}