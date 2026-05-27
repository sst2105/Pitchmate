import tempfile
import os
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from agents.resume_agent import analyze_resume, ResumeProfile

router = APIRouter()

@router.post("/analyze/resume",response_model= None)
async def analyze_resume_route(file: UploadFile = File(...)) -> dict:
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code= 400, detail="only pdf file supported")

    with tempfile.NamedTemporaryFile(delete=False, suffix = "pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        result: ResumeProfile = analyze_resume(tmp_path)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    finally:
        os.unlink(tmp_path)
    
    return result.__dict__