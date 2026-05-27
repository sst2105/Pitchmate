import tempfile
import os

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header
from typing import Optional 

from agents.jd_agent import analyze_jd, JDAnalysis
from agents.resume_agent import analyze_resume, ResumeProfile
from agents.company_agent import research_company, CompanyProfile
from agents.gap_agent import analyze_gap, GapReport
from memory.session_memory import clear_session, session_status
from memory.session_memory import get_session, update_session, clear_session , session_status

router = APIRouter(prefix = "/pipeline")

def _require_session_id(session_id: Optional[str]) -> str:
    if not session_id:
        raise HTTPException(status_code = 400, detail = "X-Session-ID header is required")
    return session_id

@router.get("/status")
def get_status(x_session_id: Optional[str] = Header(default=None)) -> dict:
    sid = _require_session_id(x_session_id)
    return session_status(sid)

@router.delete("/session")
def reset_session(x_session_id : Optional[str] = Header(default=None)) -> dict:
    sid = _require_session_id(x_session_id)
    clear_session(sid)
    return {"cleared":True}

@router.post("/resume")
async def pipeline_resume(
    x_session_id: Optional[str] = Header(default = None),
    resume: Optional[UploadFile] = File(default=None),
) -> dict:
    """
    - File provided → analyse + store in session + return result
    - No file, session has resume → return cached
    - Neither → tell frontend what's needed
    """
    sid = _require_session_id(x_session_id)
    session = get_session(sid)

    if resume is None:
        if session.resume:
            return{"source": "session", "resume": session.resume}
        return {"needs":["resume_pdf"], "message": "Please upload your resume PDF"}
    
    if not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail = "Resume must be a PDF")
    
    contents = await resume.read()
    tmp_fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
    with os.fdopen(tmp_fd, "wb") as tmp:
        tmp.write(contents)
    
    try:
        result = analyze_resume(tmp_path)
    except ValueError as e:
        raise HTTPException(status_code = 422, detail = str(e))
    finally:
        os.unlink(tmp_path)
    
    update_session(sid, resume = result.__dict__)
    return {"source" : "fresh", "resume": result.__dict__}

@router.post("/jd")
async def pipeline_jd(
    x_session_id: Optional[str] = Header(default=None),
    jd_text: str = Form(default=""),
    jd_url:  str = Form(default=""),
    jd_file: Optional[UploadFile] = File(default=None),
) -> dict:

    sid = _require_session_id(x_session_id)
    session = get_session(sid)
 
    if not jd_text.strip() and not jd_url.strip() and jd_file is None:
        if session.jd:
            return {"source": "session", "jd": session.jd}
        return {
            "needs": ["jd_text or jd_url or jd_file"],
            "message": "Paste the JD, provide a URL, or upload a PDF/.docx"
        }
 
    try:
        if jd_text.strip():
            raw_jd = jd_text.strip()[:6000]
 
        elif jd_url.strip():
            from utils.parsers import parse_url
            raw_jd = parse_url(jd_url)
 
        else:
            from utils.jd_input_parser import parse_jd
            file_bytes = await jd_file.read()
            raw_jd = parse_jd(file_bytes, filename=jd_file.filename)
 
        result = analyze_jd(raw_jd)
 
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, jd=result.__dict__)
    return {"source": "fresh", "jd": result.__dict__}

@router.post("/company")
async def pipeline_company(
    x_session_id : Optional[str] = Header(default = None),
    company_name: str = Form(default= ""),
)-> dict:
    
    sid = _require_session_id(x_session_id)
    session = get_session(sid)

    resolved_name = company_name.strip()
    resolved_role = ""

    if not resolved_name and session.jd:
        resolved_name = session.jd.get("company_name", "")
        resolved_role = session.jd.get("role_title", "")
 
    if not resolved_name:
        return {
            "needs": ["company_name or run /pipeline/jd first"],
            "message": "Run JD analysis first and we'll extract the company automatically"
        }
 
    try:
        result = research_company(resolved_name, resolved_role)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, company=result.__dict__)
    return {"source": "fresh", "company": result.__dict__}

@router.post("/gap")
async def pipeline_gap(
    x_session_id: Optional[str] = Header(default=None),
    resume: Optional[UploadFile] = File(default=None),
    jd_text: str = Form(default=""),
    jd_url:  str = Form(default=""),
    jd_file: Optional[UploadFile] = File(default=None),
) -> dict:
    """
    Smart resolution:
    1. Check session for resume + JD
    2. Accept new inputs for anything missing
    3. Only ask for what's actually missing
    4. Run gap_agent only when both are resolved
    """

    sid = _require_session_id(x_session_id)
    session  = get_session(sid)
    needs = []

    resume_data = session.resume
    
    if resume_data is None and resume is not None:
        if not resume.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code= 400, detail="Resume must be a PDF")
        
        contents = await resume.read()
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
        with os.fdopen(tmp_fd, "wb") as tmp:
            tmp.write(contents)

        try:
            resume_result = analyze_resume(tmp_path)
        except ValueError as e:
            raise HTTPException(status_code=422, detail= f"Resume error:{e}")
        finally:
            os.unlink(tmp_path)
        update_session(sid, resume=resume_result.__dict__)
        resume_data = resume_result.__dict__
 
    if resume_data is None:
        needs.append("resume_pdf")
    
    jd_data = session.jd

    if jd_data is None and (jd_text.strip() or jd_url.strip() or jd_file is not None):
        try:
            if jd_text.strip():
                raw_jd = jd_text.strip()[:6000]
            elif jd_url.strip():
                from utils.parsers import parse_url
                raw_jd = parse_url(jd_url)
            else:
                from utils.jd_input_parser import parse_jd
                file_bytes = await jd_file.read()
                raw_jd = parse_jd(file_bytes, filename = jd_file.filename)
            jd_result = analyze_jd(raw_jd)
        except ValueError as e:
            raise HTTPException(status_code = 422, detail=f"JD error: {e}")
        
        update_session(sid, jd= jd_result.__dict__)
        jd_data = jd_result.__dict__

    if jd_data is None:
        needs.append("jd_text or jd_url or jd_file")
 
    
    if needs:
        return {
            "needs": needs,
            "message": f"Still need: {', '.join(needs)}",
            "session_has": {
                "resume": session.resume is not None,
                "jd":     session.jd     is not None,
            }
        }
 
    
    from agents.jd_agent import JDAnalysis
    from agents.resume_agent import ResumeProfile
 
    jd_obj     = JDAnalysis(**jd_data)
    resume_obj = ResumeProfile(**resume_data)
 
    try:
        gap_result = analyze_gap(jd_obj, resume_obj)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, gap=gap_result.__dict__)
 
    return {
        "gap": gap_result.__dict__,
        "used": {
            "resume": "session" if session.resume and resume is None else "fresh",
            "jd":     "session" if session.jd and not jd_text and not jd_url else "fresh",
        }
    }




    
