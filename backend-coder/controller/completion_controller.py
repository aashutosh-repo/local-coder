from fastapi import APIRouter

from models.request import CompletionRequest

from models.response import CompletionResponse

from services.completion_service import CompletionService

router = APIRouter()

service = CompletionService()


@router.post("/complete")

def complete(request: CompletionRequest):

    completion = service.complete(request)

    return CompletionResponse(

        completion=completion
    )