from fastapi import APIRouter
from models.request import CompletionRequest
from models.response import CompletionResponse
from services.completion_service import CompletionService

router = APIRouter()

service = CompletionService()


@router.post("/complete", response_model=CompletionResponse)
async def complete(request: CompletionRequest):
    """
    Handle code completion requests from the frontend.
    
    - **task**: Type of task (completion, chat, edit, etc.)
    - **context**: Code context with language, file info, prefix/suffix
    - **prompt**: Optional custom prompt
    - **temperature**: Model temperature (0.0-1.0)
    - **maxTokens**: Maximum tokens to generate
    """
    try:
        print(f"Completion request for task: {request.task}, language: {request.context.language}")

        completion = service.complete(request)

        print(f"Completion response: {str(completion)[:100]}...")
        
        return CompletionResponse(
            completion=completion
        )
    except Exception as e:
        print(f"Error processing request: {e}")
        import traceback
        traceback.print_exc()
        return CompletionResponse(completion=f"Error: {str(e)}")