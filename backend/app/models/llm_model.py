from pydantic import BaseModel, Field

class AnswerResponse(BaseModel):
  score: str = Field(description="Score of the the student. The full score being 5")
  reason: str = Field(description="Reseaon why the student got the score")
  