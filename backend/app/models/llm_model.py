import base64
import gdown
import os

from pydantic import BaseModel, Field
from langchain_openai import AzureChatOpenAI, AzureOpenAIEmbeddings
from langchain_core.messages import HumanMessage, SystemMessage, BaseMessage
from langchain_chroma import Chroma
from app.config import Settings

class ChatIn(BaseModel):
  system_message: str = Field(description="The system message that the AI model sends to the user")
  human_message: str = Field(description="The message that the user sends to the AI model")

class GradeIn(BaseModel):
  question: str = Field(description="The question that the student has to answer")
  answer: str = Field(description="The answer that the student has given")

class GradeResponse(BaseModel):
  score: str = Field(description="Score of the the student. The full score being 5")
  reason: str = Field(description="Reseaon why the student got the score")

class ModelResource():
  
  def __init__(self) -> None:
    
    settings = Settings()
    
    if not os.path.exists('./data/chroma-db'):
      id = "1YJ8WKdOs0lUCedGDaVHV6WrvhuzXikA2"
      output = "./data/chroma-db"
      gdown.download_folder(id=id, output=output, quiet=False)
    
    self.model = AzureChatOpenAI(
      azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
      openai_api_key=settings.AZURE_OPENAI_KEY,
      openai_api_version=settings.AZURE_OPENAI_API_VERSION,
    )
    
    self.embeddings = AzureOpenAIEmbeddings(
      azure_deployment=settings.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
      openai_api_version=settings.AZURE_OPENAI_EMBEDDING_API_VERSION,
      azure_endpoint=settings.AZURE_OPENAI_EMBEDDING_ENDPOINT,
      api_key=settings.AZURE_OPENAI_EMBEDDING_KEY,
    )
    
    self.vector_store = Chroma(
      collection_name="vat_manual",
      embedding_function=self.embeddings,
      persist_directory='./data/chroma-db',
    )
    
  def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
  
  def invoke(self, 
             system_message: str, 
             human_message: str) -> BaseMessage:
    
    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=human_message)
    ]
    
    result = self.model.invoke(messages)
    return result
  
  def invoke_with_rag(self, 
                      rag_message: str,
                      human_message: str,
                      system_message: str) -> BaseMessage:
    
    retrieved_results = self.vector_store.similarity_search(rag_message, k=5)
    context = ""
    for res in retrieved_results:
        context += f"""
            -----------------------------
            source: "คู่มือภาษีเงินได้บุคคลธรรมดา"
            page: {res.metadata['page'] + 2}
            content: {res.page_content}
            ------------------------------\n
        """
    
    messages = [
        SystemMessage(content=system_message),
        HumanMessage(content=f"""
            context: {context}
            question: {human_message}
        """),
    ]
    
    result = self.model.invoke(messages)
    return result