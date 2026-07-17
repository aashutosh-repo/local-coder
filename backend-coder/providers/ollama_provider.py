import requests

from config import MODEL_NAME
from config import OLLAMA_URL


class OllamaProvider:

    def complete(self, prompt: str, temperature: float = 0.2, max_tokens: int = 128):

        response = requests.post(

            OLLAMA_URL,

            json={

                "model": MODEL_NAME,

                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": temperature,
                },
                "num_predict": max_tokens,

            }

        )

        response.raise_for_status()

        return response.json().get("response", "")