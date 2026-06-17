import tempfile
import os

from utils.rate_limiter import limiter
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header, Depends,Request
from sqlalchemy.orm import Session
from typing import Optional 

from agents.jd_agent import analyze_jd, JDAnalysis
from agents.resume_agent import analyze_resume, ResumeProfile
from agents.company_agent import research_company, CompanyProfile
from agents.gap_agent import analyze_gap, GapReport
from memory.session_memory import clear_session, session_status
from memory.session_memory import get_session, update_session, clear_session , session_status
from services.database import get_db

router = APIRouter(prefix = "/pipeline")

def _sid(session_id: Optional[str]) -> str:
    if not session_id:
        raise HTTPException(status_code=400, detail="X-Session-ID header is required")
    return session_id
 
 
@router.get("/status")
def get_status(x_session_id: Optional[str] = Header(default=None), db: Session = Depends(get_db)) -> dict:
    return session_status(db, _sid(x_session_id))
 
 
@router.delete("/session")
def reset_session(x_session_id: Optional[str] = Header(default=None), db: Session = Depends(get_db)) -> dict:
    clear_session(db, _sid(x_session_id))
    return {"cleared": True}
 
 
@router.post("/resume")
@limiter.limit("30/hour")
async def pipeline_resume(
    request: Request,
    x_session_id: Optional[str] = Header(default=None),
    resume: Optional[UploadFile] = File(default=None),
    db: Session = Depends(get_db),
) -> dict:
    sid = _sid(x_session_id)
    session = get_session(sid)
 
    if resume is None:
        if session.get("resume"):
            return {"source": "session", "resume": session["resume"]}
        return {"needs": ["resume_pdf"], "message": "Please upload your resume PDF"}
 
    if not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Resume must be a PDF")
 
    contents = await resume.read()
    tmp_fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
    with os.fdopen(tmp_fd, "wb") as f:
        f.write(contents)
    try:
        result = analyze_resume(tmp_path)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    finally:
        os.unlink(tmp_path)
 
    update_session(sid, resume=result.__dict__)
    return {"source": "fresh", "resume": result.__dict__}
 
 
@router.post("/jd")
@limiter.limit("50/hour")
async def pipeline_jd(
    request: Request,
    x_session_id: Optional[str] = Header(default=None),
    jd_text: str = Form(default=""),
    jd_url:  str = Form(default=""),
    jd_file: Optional[UploadFile] = File(default=None),
    db: Session = Depends(get_db),
) -> dict:
    sid = _sid(x_session_id)
    session = get_session(sid)
 
    if not jd_text.strip() and not jd_url.strip() and jd_file is None:
        if session.get("jd"):
            return {"source": "session", "jd": session["jd"]}
        return {"needs": ["jd_text or jd_url or jd_file"], "message": "Provide JD input"}
 
    try:
        if jd_text.strip():
            raw_jd = jd_text.strip()[:6000]
        elif jd_url.strip():
            from utils.parsers import parse_url
            raw_jd = parse_url(jd_url)
        else:
            from utils.jd_input_parser import parse_jd
            raw_jd = parse_jd(await jd_file.read(), filename=jd_file.filename)
        result = analyze_jd(raw_jd)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, jd=result.__dict__)
    return {"source": "fresh", "jd": result.__dict__}
 
 
@router.post("/company")
@limiter.limit("20/hour")
async def pipeline_company(
    request: Request,
    x_session_id: Optional[str] = Header(default=None),
    company_name: str = Form(default=""),
    db: Session = Depends(get_db),
) -> dict:
    sid = _sid(x_session_id)
    session = get_session(sid)
 
    name = company_name.strip()
    role = ""
    if not name and session.get("jd"):
        name = session["jd"].get("company_name", "")
        role = session["jd"].get("role_title", "")
 
    if not name:
        return {"needs": ["company_name or jd"], "message": "Run JD analysis first"}
 
    try:
        result = research_company(name, role)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, company=result.__dict__)
    return {"source": "fresh", "company": result.__dict__}
 
 
@router.post("/gap")
@limiter.limit("30/hour")
async def pipeline_gap(
    request : Request,
    x_session_id: Optional[str] = Header(default=None),
    resume: Optional[UploadFile] = File(default=None),
    jd_text: str = Form(default=""),
    jd_url:  str = Form(default=""),
    jd_file: Optional[UploadFile] = File(default=None),
    db: Session = Depends(get_db),
) -> dict:
    sid = _sid(x_session_id)
    session = get_session(sid)
    needs = []
 
    resume_data = session.resume
    if resume_data is None and resume is not None:
        if not resume.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Resume must be a PDF")
        contents = await resume.read()
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
        with os.fdopen(tmp_fd, "wb") as f:
            f.write(contents)
        try:
            r = analyze_resume(tmp_path)
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
        finally:
            os.unlink(tmp_path)
        update_session(sid, resume=r.__dict__)
        resume_data = r.__dict__
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
                raw_jd = parse_jd(await jd_file.read(), filename=jd_file.filename)
            j = analyze_jd(raw_jd)
        except ValueError as e:
            raise HTTPException(status_code=422, detail=str(e))
        update_session(sid, jd=j.__dict__)
        jd_data = j.__dict__
    if jd_data is None:
        needs.append("jd_text or jd_url or jd_file")
 
    if needs:
        return {"needs": needs, "message": f"Still need: {', '.join(needs)}",
                "session_has": {"resume": session.get("resume") is not None, "jd": session.get("jd") is not None}}
 
    from agents.jd_agent import JDAnalysis
    from agents.resume_agent import ResumeProfile
 
    try:
        gap = analyze_gap(JDAnalysis(**jd_data), ResumeProfile(**resume_data))
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
 
    update_session(sid, gap=gap.__dict__)
    return {"gap": gap.__dict__}




    
