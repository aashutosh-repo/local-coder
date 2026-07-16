from fastapi import APIRouter

from models.request import CompletionRequest

from models.response import CompletionResponse

from services.completion_service import CompletionService

router = APIRouter()

service = CompletionService()


@router.post("/complete")

def complete(request: CompletionRequest):

    print("Input request : ",request);

    completion = service.complete(request)

    print("Response : ", completion)
    return CompletionResponse(

        completion=completion
    )