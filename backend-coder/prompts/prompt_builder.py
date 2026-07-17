class PromptBuilder:

    @staticmethod
    def build(request):
        """
        Build a prompt from AIRequest based on task type
        """
        task = request.task
        context = request.context

        # Extract context information
        language = context.language
        prefix = context.prefix
        suffix = context.suffix
        imports = "\n".join(context.imports) if context.imports else ""
        class_name = context.className or ""
        method_name = context.methodName or ""

        # Build context string
        context_parts = []
        if class_name:
            context_parts.append(f"Class: {class_name}")
        if method_name:
            context_parts.append(f"Method: {method_name}")
        if imports:
            context_parts.append(f"Imports:\n{imports}")
        if context.diagnostics:
            context_parts.append(f"Issues:\n{chr(10).join(context.diagnostics)}")

        context_str = "\n".join(context_parts)

        prompt_data = request.prompt
        if prompt_data:
            prompt_parts = []
            if prompt_data.systemPrompt:
                prompt_parts.append(prompt_data.systemPrompt.strip())
            if prompt_data.userPrompt:
                prompt_parts.append(prompt_data.userPrompt.strip())

            if prompt_parts:
                prompt_text = "\n\n".join(prompt_parts)
                if context_str:
                    prompt_text += f"\n\nContext:\n{context_str}"
                if task == "completion":
                    return f"""{prompt_text}

File: {context.fileName}
Language: {language}

Prefix (code before cursor):
```{language}
{prefix}
```

Suffix (code after cursor):
```{language}
{suffix}
```
"""
                return prompt_text

        if task == "completion":
            return f"""You are an expert {language} programmer and code completion assistant.

File: {context.fileName}
Language: {language}

{context_str}

Complete the code at the cursor position.

Prefix (code before cursor):
```{language}
{prefix}
```

Suffix (code after cursor):
```{language}
{suffix}
```

Generate ONLY the missing code to complete seamlessly. Return only the code without markdown or explanations."""

        elif task == "chat":
            return f"""You are an expert {language} programmer.

File: {context.fileName}
Language: {language}

{context_str}

Help the user with their coding question."""

        elif task == "edit":
            return f"""You are an expert {language} programmer specializing in code editing.

File: {context.fileName}
Language: {language}

Original code:
```{language}
{prefix}{suffix}
```

Apply the requested edit and return the complete replacement code.
Do not explain, do not summarize, and do not truncate the code.
Return only the edited code without markdown fences."""

        else:
            # Default completion behavior
            return f"""You are an expert {language} programmer.

Language: {language}

{context_str}

Prefix:
{prefix}

Suffix:
{suffix}

Return ONLY the text to insert at the cursor position.

Rules:
- No markdown
- No explanations
- No imports
- No classes
- No methods
- No duplicate code"""