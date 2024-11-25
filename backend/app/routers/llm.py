import base64
import logging
import os
import chromadb
from pathlib import Path

from app.config import Settings
from app.models.llm_model import AnswerResponse, ChatIn, QuestionGradeIn
from fastapi import APIRouter
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_openai import AzureChatOpenAI, AzureOpenAIEmbeddings


router = APIRouter()
settings = Settings()
logger = logging.getLogger(__name__)


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


model = AzureChatOpenAI(
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    openai_api_key=settings.AZURE_OPENAI_KEY,
    openai_api_version=settings.AZURE_OPENAI_API_VERSION,
)

embeddings: AzureOpenAIEmbeddings = AzureOpenAIEmbeddings(
    azure_deployment=settings.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
    openai_api_version=settings.AZURE_OPENAI_EMBEDDING_API_VERSION,
    azure_endpoint=settings.AZURE_OPENAI_EMBEDDING_ENDPOINT,
    api_key=settings.AZURE_OPENAI_EMBEDDING_KEY,
)

vector_store = Chroma(
    collection_name="vat_manual",
    embedding_function=embeddings,
    persist_directory='./app/chroma-db',
)

@router.post("/chat")
async def chat(chat_in: ChatIn):
    
    results = vector_store.similarity_search(chat_in.human_message, k=5)
    context = ""
    for res in results:
        context += f"""
            -----------------------------
            source: "คู่มือภาษีเงินได้บุคคลธรรมดา"
            page: {res.metadata['page'] + 2}
            content: {res.page_content}
            ------------------------------\n
        """

    messages = [
        SystemMessage(content=chat_in.system_message),
        HumanMessage(content=f"""
            context: {context}
            question: {chat_in.human_message}
        """),
    ]

    result = model.invoke(messages)
    parser = StrOutputParser()
    parser_output = parser.invoke(result)

    return {"message": parser_output}


@router.post("/chat-rag")
async def chat_rag(chat_in: ChatIn):
    
    messages = [
        SystemMessage(content=chat_in.system_message),
        HumanMessage(content=chat_in.human_message)
    ]
    
    result = model.invoke(messages)
    parser = StrOutputParser()
    parser_output = parser.invoke(result)
    
    return {"message": parser_output}


@router.get("/chat-vision")
async def chat_vision():
    # img_agg = [
    #     {"type": "text", "text": "Here are the images of the question and answer"},
    # ]
    # folder_dir = "./app/test_jpg"

    # images = Path(folder_dir).glob("*.jpg")

    # for image in images:
    #     base64_image = encode_image(image)

    #     img_agg.append(
    #         {
    #             "type": "image_url",
    #             "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
    #         }
    #     )

    # sys_prompt = """
    # You are an AI language model trained to evaluate students' financial exams based on specific grading criteria.
    # The question and answer might be in Thai or English language.
    # Your task is as follows:

    # Task 1 Read Input: Extract the question and student answer from an input image (JPG format). The text extracted should include both the question and the student's response.
    # Scoring: Assess the student's answer based on the following scale:

    # 0: The answer is completely incorrect or irrelevant.
    # 1: The answer shows minimal understanding, with major inaccuracies.
    # 2: The answer demonstrates some understanding, but there are significant errors or omissions.
    # 3: The answer is mostly correct, with minor errors or incomplete explanations.
    # 4: The answer is correct with only very minor inaccuracies or a slight lack of depth.
    # 5: The answer is fully accurate, complete, and well-explained.

    # Task 2 Reasoning: Provide a detailed explanation of why the given score was assigned, including identification of errors, areas of incomplete analysis, or strengths in the response.
    # You should evaluate based on the core financial concepts, accuracy of calculations, logical coherence, and relevance to the question asked. Be fair, objective, and detailed in your reasoning.

    # """

    # messages = [
    #     SystemMessage(content=sys_prompt),
    #     HumanMessage(content=img_agg),
    # ]

    # result = model.invoke(messages)
    # parser = StrOutputParser()
    # parser_output = parser.invoke(result)

    # return parser_output
    return {"message": "Not implemented"}


@router.post("/grading")
def grading( question_grade_in: QuestionGradeIn):

    sys_prompt = """
        "You are an AI language model trained to evaluate students' financial exams based on specific grading criteria.
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
        You should evaluate based on the core financial concepts, accuracy of calculations, logical coherence, and relevance to the question asked. Be fair, objective, and detailed in your reasoning."
        The reason output should in Thai translation.

        The output should be formatted as a JSON instance that conforms to the JSON schema below.

        As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
        the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

        Here is the output schema:

        {"properties": {"score": {"description": "Score of the the student. The full score being 5", "title": "Score", "type": "string"}, "reason": {"description": "Reseaon why the student got the score", "title": "Reason", "type": "string"}}, "required": ["score", "reason"]}
    """
    # For testing
    # answer = """
    #     \n\n**Student's Answer:**\n\n**ขั้นตอนที่ 1:** คำนวณหาค่าใช้จ่ายหลังเกษียณ (FV) ดังนี้\n\n```\nCMPD\nMODE : END/ BGN\nN : 60-49 = 11\ni : 3\nPV : -360,000\nPMT : 0\nFV : CPT : 498,324.19 — Ans.\n```\n\n**ขั้นตอนที่ 2:** คำนวณหาเงินเกษียณ ณ อายุเกษียณ (PV) ดังนี้\n\n```\nCMPD\nMODE: BGN\nN: 85-60 = 25\ni: \\(\\left( \\frac{1+0.02}{1+0.03} - 1 \\right) \\times 100 = -0.9708\\)\nPV: CPT : -14,039,990.26 — Ans.\nPMT: 498,324.19\nFV: 0\n```\n\n**ขั้นตอนที่ 3:** นำทรัพย์สินที่มีอยู่แล้ว\n\n**3.1:** มูลค่าเงินลงทุนรวม ณ อายุเกษียณ (FV) ดังนี้\n\n```\nCMPD\nMODE: BGN\nN: 11\ni: 5\nPV: -350,000\nPMT: -60,000\nFV: CPT: 1,493,646.37 — Ans.\n```\n\n**3.2:** คำนวณมูลค่ากองทุนสำรองเลี้ยงชีพ (เดิม) ดังนี้\n\n```\nCMPD\nMODE: END/ BGN\nN: 11\ni: 2.5\nPV: -275,000\nPMT: 0\nFV: CPT: 360,823.83 — Ans.\n```\n\n**3.3:** คำนวณหามูลค่าอนาคต (FV) ของกองทุนสำรองเลี้ยงชีพ ดังนี้\n\n```\nFV = A(1+i) \\left[ \\frac{(1+i)^n - (1+g)^n}{i-g} \\right]\n= 62400(1.025) \\left[ \\frac{(1.025)^{11} - (1.04)^{11}}{0.025 - 0.04} \\right]\n= 62400(1.025) \\left[ \\frac{1.3121 - 1.5349}{-0.015} \\right]\n= 62400(1.025) \\left( -14.9333 \\right)\n= 969,633.60 — Ans.\n```\n\nรวมสินทรัพย์ที่มีอยู่แล้ว ณ วันเกษียณ คือ\n\n```\n1,493,646.37 + 360,823.83 + 949,633.60 + 1,200,000 = 4,024,103.80 — Ans.\n```\n\n**ขั้นตอนที่ 4:** คำนวณเงินเกษียณที่ยังขาดอยู่ ดังนี้\n\n```\n14,039,990.26 - 4,024,103.80 = 10,015,886.46 — Ans.\n```\n\n**ขั้นตอนที่ 5:** คำนวณเงินที่ต้องออม/ลงทุนในส่วนที่ขาด ดังนี้\n\n```\nCMPD\nMODE: BGN\nN: 11\ni: 5\nPV: 0\nPMT: CPT: -674,435.38 — Ans.\nFV: 10,015,886.46\n```\n\n**สรุป** คุณสมชาย ควรมีเงินเกษียณ 14,039,990.26 บาท โดยรวมสินทรัพย์ที่มีอยู่แล้ว 4,024,103.80 บาท ยังขาดอยู่ 10,015,886.46 บาท ต้องลงทุนเพิ่มปีละ 674,435.38 บาท\n\n###
    # """

    # question = """
    #     \nคุณสมชาย เกิด พ.ศ.2518 อายุ 49 ปี อาชีพพนักงานบริษัทเอกชน เงินเดือนปัจจุบัน เดือนละ 52,000 บาท หักเงินสะสมประกันสังคมเดือนละ 750 หักเข้ากองทุนสำรองเลี้ยงชีพเดือนละ 5% นายจ้างสมทบ 5% ต้องการวางแผนเกษียณตอนอายุ 60 ปี คาดการณ์อาขุขัยถึงอายุ 85 ปี ต้องการมีเงินใช้เงินหลังเกษียณ ปีละ 360,000 บาท (มูลค่าปัจจุบัน) โดยปัจจุบันมีกองทุนรวม 350,000 บาท และจะออมเพิ่มปีละ 60,000 บาท มูลค่ากองทุนสำรองเลี้ยงชีพปัจจุบัน 275,000 บาท มีประกันชีวิตควบการลงทุนที่จะครบกำหนดตอนเกษียณ มูลค่าคาดการณ์ 1,200,000 บาท ขอให้คำนวณเงินที่ต้องมี ณ วันเกษียณ จากทรัพยากรที่มีอยู่เพียงพอหรือไม่ หากไม่เพียงพอจะออมเพิ่มปีละเท่าไหร่
    #     สมมติฐาน
    #     - อัตราเงินเฟ้อ = 3%
    #     - อัตราการเติบโตของรายได้ = 4%
    #     - ผลตอบแทนจากการลงทุนของกองทุนสำรองเลี้ยงชีพ = 2.5%
    #     - ผลตอบแทนจากการลงทุนก่อนเกษียณ = 5%
    #     - ผลตอบแทนจากการลงทุนก่อนเกษียณ = 2%
    # """
    
    human_message = f"""
        question: {question_grade_in.question}
        answer: {question_grade_in.answer}
    """
    
    messages = [
        SystemMessage(content=sys_prompt),
        HumanMessage(content=human_message)
    ]
    
    result = model.invoke(messages)
    parser = JsonOutputParser(pydantic_object=AnswerResponse)
    parser_output = parser.invoke(result)

    return parser_output