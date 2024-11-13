# cd backend
# uvicorn app.main:app --reload

import logging

from fastapi import FastAPI

from app.routers import minio

# LLM ssection
import os
from langchain_openai import AzureChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser

model = AzureChatOpenAI(
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
    azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"],
    openai_api_version=os.environ["AZURE_OPENAI_API_VERSION"],
)

# API section
ROOT_PATH = "/api"
DOCS_PATH = "/docs"

app = FastAPI(
    title="ACC Education Service",
    root_path=ROOT_PATH,
    docs_url=DOCS_PATH,
)

@app.post("/chat", tags=["LLM"])
async def chat(user_essage:str):

    messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content=user_essage),
]

    result = model.invoke(messages)
    parser = StrOutputParser()
    parser_output = parser.invoke(result)

    return {"message": parser_output}

app.include_router(minio.router, prefix="/minio", tags=["minio"])