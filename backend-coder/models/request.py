from pydantic import BaseModel


class CompletionRequest(BaseModel):
    language: str
    prefix: str
    suffix: str