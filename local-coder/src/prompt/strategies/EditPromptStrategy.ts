import { PromptContext } from "../../api/models/PromptContext";
import { AIRequest } from "../../ai/models/AIRequest";
import { IPromptStrategy } from "./IPromptStrategy";

export class EditPromptStrategy implements IPromptStrategy {

    build(request: AIRequest): PromptContext {
        const { context } = request;
        const { prefix, suffix, language, fileName } = context;

        const systemPrompt = `You are an expert ${language} programmer specializing in code editing and refactoring.
Apply requested edits while maintaining code quality and consistency.`;

        const userPrompt = `Edit the following code according to the instructions:

File: ${fileName}
Language: ${language}

Original Code:
\`\`\`${language}
${prefix}${suffix}
\`\`\`

Edit Instructions:
${request.prompt?.userPrompt || 'Apply the necessary edits.'}

Return only the edited code without explanations or markdown.`;

        return {
            systemPrompt,
            userPrompt
        };
    }
}
