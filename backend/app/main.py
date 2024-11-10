import logging

from fastapi import FastAPI

from app.routers import minio

ROOT_PATH = "/api"
DOCS_PATH = "/docs"

app = FastAPI(
    title="ACC Education Service",
    root_path=ROOT_PATH,
    docs_url=DOCS_PATH,
)

logger = logging.getLogger(__name__)


@app.get("/ping")
async def ping():
    logger.info("[main] ping")
    return {"message": "OK"}

app.include_router(minio.router, prefix="/minio", tags=["minio"])