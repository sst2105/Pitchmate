from re import S
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agents.company_agent import research_company, CompanyProfile

router = APIRouter()

class CompanyRequest(BaseModel):
    company_name:str
    role_title: str

@router.post("/analyz/company")
async def analyze_company_route(body: CompanyRequest)-> dict:
    if not body.company_name.strip():
        raise HTTPException(status_code=400, detail="company_name is required")
    if not body.role_title.strip():
        raise HTTPException(status_code=400, detail="role_title is required")
    
    try:
        result: CompanyProfile = research_company(body.company_name, body.role_title)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    return result.__dict__
