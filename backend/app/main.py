# cd backend
# uvicorn app.main:app --reload

from dotenv import load_dotenv
from fastapi import FastAPI

from app.routers import llm, minio

load_dotenv()

# API section
ROOT_PATH = "/api"
DOCS_PATH = "/docs"

app = FastAPI(
    title="ACC Education Service",
    root_path=ROOT_PATH,
    docs_url=DOCS_PATH,
)

app.include_router(minio.router, prefix="/minio", tags=["minio"])
app.include_router(llm.router, prefix="/llm", tags=["llm"])
