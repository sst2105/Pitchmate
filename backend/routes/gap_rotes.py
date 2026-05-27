from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agents.gap_agent import analyze_gap, GapReport
from agents.jd_agent import JDAnalysis
from agents.resume_agent import ResumeProfile

router = APIRouter()


# Pydantic models mirror the dataclasses — FastAPI needs these for request validation
class JDAnalysisInput(BaseModel):
    role_title:         str
    company_name:       str
    responsibilities:   list[str]   = []
    required_skills:    list[str]   = []
    preferred_skills:   list[str]   = []
    soft_skills:        list[str]   = []
    experience_needed:  str         = ""
    education:          str         = ""
    culture_signals:    list[str]   = []
    red_flags:          list[str]   = []
    summary:            str         = ""
    raw_text_length:    int         = 0


class ResumeProfileInput(BaseModel):
    name:                   str
    contact:                str         = ""
    skills:                 list[str]   = []
    experience:             list[str]   = []
    education:              list[str]   = []
    projects:               list[str]   = []
    certifications:         list[str]   = []
    total_experience_years: float       = 0.0
    seniority_level:        str         = "Unknown"
    raw_text_length:        int         = 0


class GapRequest(BaseModel):
    jd:     JDAnalysisInput
    resume: ResumeProfileInput


@router.post("/analyze/gap")
async def analyze_gap_route(body: GapRequest) -> dict:
    # Convert Pydantic models back to dataclasses for the agent
    jd = JDAnalysis(
        role_title          = body.jd.role_title,
        company_name        = body.jd.company_name,
        responsibilities    = body.jd.responsibilities,
        required_skills     = body.jd.required_skills,
        preferred_skills    = body.jd.preferred_skills,
        soft_skills         = body.jd.soft_skills,
        experience_needed   = body.jd.experience_needed,
        education           = body.jd.education,
        culture_signals     = body.jd.culture_signals,
        red_flags           = body.jd.red_flags,
        summary             = body.jd.summary,
        raw_text_length     = body.jd.raw_text_length,
    )

    resume = ResumeProfile(
        name                    = body.resume.name,
        contact                 = body.resume.contact,
        skills                  = body.resume.skills,
        experience              = body.resume.experience,
        education               = body.resume.education,
        projects                = body.resume.projects,
        certifications          = body.resume.certifications,
        total_experience_years  = body.resume.total_experience_years,
        seniority_level         = body.resume.seniority_level,
        raw_text_length         = body.resume.raw_text_length,
    )

    try:
        result: GapReport = analyze_gap(jd, resume)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    return result.__dict__