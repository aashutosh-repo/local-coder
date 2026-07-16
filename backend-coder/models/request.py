from pydantic import BaseModel, ConfigDict
from typing import Optional, List


class CompletionContext(BaseModel):
    model_config = ConfigDict(extra='forbid')
    
    language: str
    fileName: str
    packageName: Optional[str] = None
    imports: List[str] = []
    className: Optional[str] = None
    methodName: Optional[str] = None
    prefix: str
    suffix: str
    diagnostics: List[str] = []
    workspaceName: Optional[str] = None
    relativePath: Optional[str] = None
    openFiles: List[str] = []
    symbols: List[str] = []


class PromptContextData(BaseModel):
    model_config = ConfigDict(extra='forbid')
    
    systemPrompt: Optional[str] = None
    userPrompt: Optional[str] = None


class CompletionRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    
    task: str
    context: CompletionContext
    prompt: Optional[PromptContextData] = None
    temperature: Optional[float] = 0.2
    maxTokens: Optional[int] = 128
