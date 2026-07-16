import { PromptContext } from "../../api/models/PromptContext";
import { AIRequest } from "../../ai/models/AIRequest";
import { IPromptStrategy } from "./IPromptStrategy";

export class ChatPromptStrategy implements IPromptStrategy {

    build(request: AIRequest): PromptContext {
        const { context } = request;
        const { language, fileName, className, methodName, imports } = context;

        const systemPrompt = `You are an expert ${language} programmer and coding assistant.
Help the user understand, debug, and improve their code.
Provide clear explanations and actionable suggestions.`;

        const contextStr = this.formatContext(context);

        const userPrompt = `${contextStr}

File: ${fileName}
Language: ${language}

${request.prompt?.userPrompt || 'Help me with this code.'}`;

        return {
            systemPrompt,
            userPrompt
        };
    }

    private formatContext(context: any): string {
        const parts: string[] = [];

        if (context.className) {
            parts.push(`Class: ${context.className}`);
        }

        if (context.methodName) {
            parts.push(`Method: ${context.methodName}`);
        }

        if (context.imports?.length > 0) {
            parts.push(`Imports:\n${context.imports.join(', ')}`);
        }

        if (context.diagnostics?.length > 0) {
            parts.push(`Issues:\n${context.diagnostics.join('\n')}`);
        }

        return parts.length > 0 ? `Context:\n${parts.join('\n')}` : '';
    }
}
