class PromptBuilder:

    @staticmethod
    def build(request):

        return f"""
You are an autocomplete engine.

Language:
{request.language}

prompt :

{request.prompt}

Return ONLY the text to insert.

Rules

- No markdown
- No explanation
- No imports
- No classes
- No methods
- No duplicate code
"""