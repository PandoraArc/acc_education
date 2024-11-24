# cd backend
# uvicorn app.main:app --reload

import logging

from fastapi import FastAPI

from app.routers import minio

# LLM ssection
import os

from pydantic import BaseModel, Field
from langchain_openai import AzureChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser

from dotenv import load_dotenv

load_dotenv()

import base64
from pathlib import Path

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
class output(BaseModel):
    score: str = Field(description="Score of the the student. The full score being 5")
    reason: str = Field(description="Reseaon why the student got the score")

parser = JsonOutputParser(pydantic_object=output)

model = AzureChatOpenAI(
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
    azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"],
    openai_api_version=os.environ["AZURE_OPENAI_API_VERSION"],
)

sys_prompt = """
    You are an AI language model trained to evaluate students' financial exams based on specific grading criteria.
    The question and answer might be in Thai or English language.
    Your task is as follows:

    Task 1 Read Input: Extract the question and student answer from an input image (JPG format). The text extracted should include both the question and the student's response.
    Scoring: Assess the student's answer based on the following scale:

    0: The answer is completely incorrect or irrelevant.
    1: The answer shows minimal understanding, with major inaccuracies.
    2: The answer demonstrates some understanding, but there are significant errors or omissions.
    3: The answer is mostly correct, with minor errors or incomplete explanations.
    4: The answer is correct with only very minor inaccuracies or a slight lack of depth.
    5: The answer is fully accurate, complete, and well-explained.

    Task 2 Reasoning: Provide a detailed explanation of why the given score was assigned, including identification of errors, areas of incomplete analysis, or strengths in the response.
    You should evaluate based on the core financial concepts, accuracy of calculations, logical coherence, and relevance to the question asked. Be fair, objective, and detailed in your reasoning.

    The reasoning should be in Thai language.

    The output should be formatted as a JSON instance that conforms to the JSON schema below.

    As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
    the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

    Here is the output schema:
    ```
    {"properties": {"score": {"description": "Score of the the student. The full score being 5", "title": "Score", "type": "string"}, "reason": {"description": "Reseaon why the student got the score", "title": "Reason", "type": "string"}}, "required": ["score", "reason"]}
    ```
    """

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


@app.get("/chat-vision", tags=["LLM"])
async def chat_vision():
    img_agg = [{"type": "text", "text": "Here are the images of the question and answer"},]
    folder_dir = './app/test_jpg'

    images = Path(folder_dir).glob('*.jpg')

    for image in images:
        base64_image = encode_image(image)

        img_agg.append({"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}})

    messages = [
    SystemMessage(content=sys_prompt),
    HumanMessage(content=img_agg),
    ]

    result = model.invoke(messages)
    parser_output = parser.invoke(result)

    return parser_output

app.include_router(minio.router, prefix="/minio", tags=["minio"])