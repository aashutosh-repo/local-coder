import requests

from config import MODEL_NAME
from config import OLLAMA_URL


class OllamaProvider:

    def complete(self, prompt: str):

        response = requests.post(

            OLLAMA_URL,

            json={

                "model": MODEL_NAME,

                "prompt": prompt,

                "stream": False

            }

        )

        response.raise_for_status()

        return response.json()["response"]