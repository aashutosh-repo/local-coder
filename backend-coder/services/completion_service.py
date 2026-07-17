from prompts.prompt_builder import PromptBuilder

from providers.ollama_provider import OllamaProvider

from utils.response_cleaner import ResponseCleaner


class CompletionService:

    def __init__(self):

        self.provider = OllamaProvider()

    def complete(self, request):

        prompt = PromptBuilder.build(request)

        response = self.provider.complete(
            prompt,
            temperature=request.temperature or 0.2,
            max_tokens=request.maxTokens or 128,
        )

        return ResponseCleaner.clean(response)