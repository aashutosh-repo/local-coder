import { PromptContext } from "../../api/models/PromptContext";
import { AIRequest } from "../../ai/models/AIRequest";
import { IPromptStrategy } from "./IPromptStrategy";

export class CompletionPromptStrategy implements IPromptStrategy {

    build(request: AIRequest): PromptContext {
        const { context } = request;
        const { prefix, suffix, language, fileName, imports, className, methodName } = context;

        const systemPrompt = `You are an expert ${language} programmer and code completion assistant.
Your task is to generate code completions that are contextually accurate and follow best practices.`;

        const contextStr = this.formatContext(context);

        const userPrompt = `Complete the code at the cursor position. 
${contextStr}

File: ${fileName}
Language: ${language}

Prefix (code before cursor):
\`\`\`${language}
${prefix}
\`\`\`

Suffix (code after cursor):
\`\`\`${language}
${suffix}
\`\`\`

Generate ONLY the missing code to complete seamlessly. Return only the code without markdown or explanations.`;

        return {
            systemPrompt,
            userPrompt
        };
    }

    private formatContext(context: any): string {
        const parts: string[] = [];

        if (context.imports?.length > 0) {
            parts.push(`Imports:\n${context.imports.join('\n')}`);
        }

        if (context.className) {
            parts.push(`Class: ${context.className}`);
        }

        if (context.methodName) {
            parts.push(`Method: ${context.methodName}`);
        }

        if (context.diagnostics?.length > 0) {
            parts.push(`Issues to fix:\n${context.diagnostics.join('\n')}`);
        }

        return parts.length > 0 ? parts.join('\n\n') : '';
    }
}
