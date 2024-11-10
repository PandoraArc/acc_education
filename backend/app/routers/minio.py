import logging
import os
import html
import json
from typing import Optional

import magic
from fastapi import APIRouter, Request, Response, UploadFile
from starlette.responses import StreamingResponse

from app.lib.minio_manager.manager import MinIoManager

router = APIRouter()

logger = logging.getLogger(__name__)


@router.get("/{path_name:path}")
async def object_list(
    path_name: str, response: Response, resp_type: Optional[str] = "list"
):
    print("object_list")
    minio_man = MinIoManager()
    if resp_type == "list":
        res = minio_man.list_objects(path_name)
        arr = []
        for item_obj, tags in res:
            if tags is None:
                continue
            tags.pop("delete_key", None)
            tags.pop("view_key", None)
            tags.pop("update_key", None)
            arr.append({"object": item_obj, "tags": tags})
        return arr

    (temp_file, obj, tags) = minio_man.get_file_object(path_name)
    response = None
    if obj is not None:
        print("filename:", obj.object_name)
        print("content_type:", obj.content_type)
        fp = open(temp_file, mode="rb")
        mime = magic.Magic(mime=True)
        response = StreamingResponse(fp, media_type=mime.from_file(temp_file))
        filename_encoded = obj.object_name.encode("utf-8")
        escaped_filename = html.escape(
            os.path.basename(filename_encoded.decode("unicode-escape"))
        )
        response.headers["Content-Disposition"] = f"filename*=UTF-8''{escaped_filename}"

    return response


@router.post("/{path_name:path}")
async def object_post(
    path_name: str, file: UploadFile, tags: Optional[str] = "{}"
):
    """
    Create/Update object
    :param path_name: filename ex /data/sheet3.csv
    :param response:
    :param token: access token
    :param file: upload file
    :param tags: json (key/value) for tags cannot be thai language ex {"project": "project name"}
    :return:
    """
    man = MinIoManager()
    print("object_post")
    print("path_name", path_name)
    old_tags = man.get_object_tags(path_name)
    if old_tags is None:
        old_tags = {}
    m_tags = {**old_tags, **json.loads(tags)}
    print("m_tags", m_tags)

    if file is not None:
        mime = magic.Magic(mime=True)
        file.file.seek(0)
        m_tags["content_type"] = mime.from_buffer(file.file.read(1024))
        file.file.seek(0)
        res = man.put_object_stream(path_name, file.file, -1, m_tags)
    else:
        res = man.set_object_tags(path_name, m_tags)

    return {"status": "success", "object": res, "tags": m_tags}
