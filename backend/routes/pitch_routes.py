from fastapi import APIRouter, Header, HTTPException, Depends
from typing import Optional


from agents.pitch_agent import generate_pitch
from agents.gap_agent import GapReport
from agents.company_agent import CompanyProfile
from memory.session_memory import get_session, update_session
from services.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/pipeline")


@router.post("/pitch")
async def pipeline_pitch(
    x_session_id : Optional[str] = Header(default=None),
    db:Session = Depends(get_db),) -> dict:
    session = get_session(db, x_session_id)
    update_session(x_session_id, pitch = ...)
    if not x_session_id:
        raise HTTPException(status_code=400, detail="X-Session-ID header is required")

    session = get_session(x_session_id)
    needs = []

    if session.gap is None:
        needs.append("gap — run /pipeline/gap first")
    if session.company is None:
        needs.append("company — run /pipeline/company first")

    if needs:
        return {
            "needs": needs,
            "message": f"Please run these first: {', '.join(needs)}",
            "session_has": {
                "gap":     session.gap     is not None,
                "company": session.company is not None,
            }
        }

    gap     = GapReport(**session.gap)
    company = CompanyProfile(**session.company)

    try:
        result = generate_pitch(gap, company)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    update_session(x_session_id, pitch=result.__dict__)

    return {
        "core":    result.core_dict,
        "pitches": result.pitches_dict,
    }