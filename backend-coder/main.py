# import time
# from urllib import response

# from fastapi import FastAPI
# from pydantic import BaseModel
# import requests

# app = FastAPI()

# OLLAMA_URL = "http://localhost:11434/api/generate"

# class CompletionRequest(BaseModel):
#     language: str
#     prefix: str
#     suffix: str

# @app.post("/complete")
# def complete(req: CompletionRequest):
#     start = time.time()
#     prompt = f"""
#         You are an autocomplete engine.

#         Language: {req.language}

#         The user is editing a source file.

#         Text before cursor:

#         {req.prefix}

#         Text after cursor:

#         {req.suffix}

#         Return ONLY the text that should be inserted exactly at the cursor.

#         IMPORTANT:

#         Never repeat text already before the cursor.

#         Never regenerate the file.

#         Never regenerate the current line.

#         Never generate imports.

#         Never generate classes.

#         Never generate methods.

#         Never explain.

#         Never use markdown.

#         Never use triple backticks.

#         Examples

#         Input:

#         System.

#         Output:

#         out.println();

#         ------------

#         Input:

#         String s =

#         Output:

#         "Hello";

#         ------------

#         Input:

#         Integer num =

#         Output:

#         Integer.valueOf(10);

#         ------------

#         Input:

#         if (

#         Output:

#         value != null)

#         Return only the inserted text.
#     """

#     response = requests.post(
#         OLLAMA_URL,
#         json={
#             "model": "qwen2.5-coder:7b",
#             "prompt": prompt,
#             "stream": False
#         }
#     )
#     data = response.json()
#     completion = data["response"]

#     completion = completion.replace("```java", "")
#     completion = completion.replace("```", "")
#     completion = completion.strip()

#     lines = completion.splitlines()
#     if len(lines) > 0:
#         completion = lines[0]

#     return {
#         "completion": completion
#     }

#     # print(response.status_code)
#     # print(response.text)
#     # print("Ollama finished in", time.time() - start, "seconds")
#     # return response.json()

from fastapi import FastAPI

from controller.completion_controller import router

app = FastAPI()

app.include_router(router)