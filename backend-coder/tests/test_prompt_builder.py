import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from models.request import CompletionContext, CompletionRequest, PromptContextData
from prompts.prompt_builder import PromptBuilder


class PromptBuilderTests(unittest.TestCase):
    def test_uses_frontend_prompt_when_present(self):
        request = CompletionRequest(
            task="completion",
            context=CompletionContext(
                language="typescript",
                fileName="app.ts",
                prefix="const a =",
                suffix=";",
                imports=[],
                diagnostics=[],
                symbols=[],
                openFiles=[],
            ),
            prompt=PromptContextData(
                systemPrompt="You are a helpful coding assistant.",
                userPrompt="Complete the missing function body.",
            ),
        )

        prompt = PromptBuilder.build(request)

        self.assertIn("You are a helpful coding assistant.", prompt)
        self.assertIn("Complete the missing function body.", prompt)


if __name__ == "__main__":
    unittest.main()
