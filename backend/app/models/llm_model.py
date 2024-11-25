from pydantic import BaseModel, Field

class ChatIn(BaseModel):
  system_message: str = Field(description="The system message that the AI model sends to the user")
  human_message: str = Field(description="The message that the user sends to the AI model")

class QuestionGradeIn(BaseModel):
  question: str = Field(description="The question that the student has to answer")
  answer: str = Field(description="The answer that the student has given")

class AnswerResponse(BaseModel):
  score: str = Field(description="Score of the the student. The full score being 5")
  reason: str = Field(description="Reseaon why the student got the score")
  