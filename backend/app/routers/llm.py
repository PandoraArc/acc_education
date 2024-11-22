import base64
import logging
import os
from pathlib import Path

from app.config import Settings
from fastapi import APIRouter
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import AzureChatOpenAI

router = APIRouter()
settings = Settings()
logger = logging.getLogger(__name__)


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


model = AzureChatOpenAI(
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    azure_deployment=settings.AZURE_OPENAI_KEY,
    openai_api_version=settings.AZURE_OPENAI_API_VERSION,
)


@router.post("/chat")
async def chat(user_essage: str):
    messages = [
        SystemMessage(content="You are a helpful assistant."),
        HumanMessage(content=user_essage),
    ]

    result = model.invoke(messages)
    parser = StrOutputParser()
    parser_output = parser.invoke(result)

    return {"message": parser_output}


@router.get("/chat-vision")
async def chat_vision():
    img_agg = [
        {"type": "text", "text": "Here are the images of the question and answer"},
    ]
    folder_dir = "./app/test_jpg"

    images = Path(folder_dir).glob("*.jpg")

    for image in images:
        base64_image = encode_image(image)

        img_agg.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
            }
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

    """

    messages = [
        SystemMessage(content=sys_prompt),
        HumanMessage(content=img_agg),
    ]

    result = model.invoke(messages)
    parser = StrOutputParser()
    parser_output = parser.invoke(result)

    return parser_output
