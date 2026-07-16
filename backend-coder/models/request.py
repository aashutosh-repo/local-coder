from pydantic import BaseModel


class CompletionRequest(BaseModel):
    language: str
    prompt: str
