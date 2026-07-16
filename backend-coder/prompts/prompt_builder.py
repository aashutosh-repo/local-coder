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

Apply the requested edit and return only the edited code without explanations."""
        
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