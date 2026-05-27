import tempfile
import os

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel

from agents.jd_agent import analyze_jd, JDAnalysis
from utils.jd_input_parser import parse_jd

router = APIRouter()


class JDInput(BaseModel):
    url:  str = ""
    text: str = ""  # raw paste — copy/paste from browser, PDF, anywhere


@router.post("/analyze/jd")
async def analyze_jd_route(body: JDInput) -> dict:
    if not body.url and not body.text:
        raise HTTPException(status_code=400, detail="Provide either 'url' or 'text'")

    try:
        if body.text.strip():
            # Raw paste — most reliable, no network needed
            print(f"[jd_routes] Text input: {len(body.text)} chars")
            jd_text = body.text.strip()[:6000]
        else:
            # URL — goes through Jina Reader in parsers.py
            print(f"[jd_routes] URL input: {body.url}")
            jd_text = parse_jd(body.url)

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    result: JDAnalysis = analyze_jd(jd_text)
    return result.__dict__


@router.post("/analyze/jd/file")
async def analyze_jd_file_route(file: UploadFile = File(...)) -> dict:
    """
    Accepts a JD as a PDF or .docx upload.
    Separate endpoint to keep the main route clean.
    """
    filename = file.filename.lower()
    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(status_code=400, detail="Only .pdf or .docx files supported")

    file_bytes = await file.read()

    try:
        jd_text = parse_jd(file_bytes, filename=file.filename)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    result: JDAnalysis = analyze_jd(jd_text)
    return result.__dict__