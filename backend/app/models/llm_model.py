from pydantic import BaseModel, Field

class QuestionGradeIn(BaseModel):
  question: str = Field(description="The question that the student has to answer")
  answer: str = Field(description="The answer that the student has given")

class AnswerResponse(BaseModel):
  score: str = Field(description="Score of the the student. The full score being 5")
  reason: str = Field(description="Reseaon why the student got the score")
  