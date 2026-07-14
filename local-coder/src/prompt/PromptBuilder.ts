import { CompletionContext } from "../context/models/CompletionContext";
import { PromptContext } from "../api/models/PromptContext";

export class PromptBuilder {

    build(context: CompletionContext): PromptContext {

        const prompt = `
You are an expert ${context.language} programmer.

The user is editing a file.

Code before cursor:
--------------------
${context.prefix}

Code after cursor:
--------------------
${context.suffix}

Complete ONLY the missing code.

Rules:
- Return only inserted code.
- No markdown.
- No explanations.
- Don't repeat existing code.
`;

        return {

            language: context.language,

            prompt

        };

    }

}