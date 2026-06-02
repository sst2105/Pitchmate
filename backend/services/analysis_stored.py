from itertools import tee
import secrets
import string
from sqlalchemy import text
from sqlalchemy.orm import Session

def _generate_token(length: int = 8) -> str:
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def get_or_create_analysis(db: Session, share_token: str) -> dict:
    result = db.execute(text("SELECT * FROM analyses WHERE share_token = :share_token"), {"token": share_token}).fetchone()

    if result:
        return dict(result._mapping)

    db.execute(
        text("""
        INSERT INTO analyses (share_token)
        VALUES (:token)
        """),
        {"token": share_token}
    )
    db.commit()
    return{
        "share_token": share_token,
        "resume": None,
        "jd": None,
        "company": None,
        "gap": None,
        "pitch": None,
    }

def update_analysis(db: Session, share_token: str, **kwargs) -> dict:
    import json 

    get_or_create_analysis(db, share_token)
    
    allowed = {"resume", "jd", "company", "gap", "pitch"}
    fields = {k: v for k, v in kwargs.items() if k in allowed}

    if not fields:
        return get_or_create_analysis(db, share_token)
    
    set_clause = ", ".join([f"{k} = :{k}" for k in fields])
    params = {k:json.dumps(v) for k, v in fields.items()}
    params["share_token"] = share_token
    params["updated_at"] = "NOW()"

    db.execute(
        text(f"""
        UPDATE analyses
        SET {set_clause}, update_at = NOW()
        WHERE share_token = :token"""),
        params
        )
    db.commit()

    return get_analysis(db, share_token)

def get_analysis(db:Session, share_token: str)-> dict | None:
    result = db.execute(
        text("SELECT * FROM analyses WHERE share_token = :token"),
        {"token": share_token}
    ).fetchone()

    if not result:
        return None
    return dict(result._mapping)

def create_new_analysis(db:Session) -> str:
    token = _generate_token()

    while True:
        existing = db.execute(
             text("SELECT id FROM analyses WHERE share_token = :token"),
            {"token": token}
        ).fetchone()
        if not existing:
            break
        token = _generate_token()
 
    db.execute(
        text("INSERT INTO analyses (share_token) VALUES (:token)"),
        {"token": token}
    )
    db.commit()
    print(f"[db] New analysis created: {token}")
    return token

def get_analysis_status(db:Session, share_token:str)-> dict:
    analysis = get_analysis(db, share_token)
    if not analysis:
        return {
            "resume": False, "jd": False,
            "company": False, "gap": False, "pitch": False,
            "exists": False,
        }
 
    return {
        "resume":  analysis.get("resume")  is not None,
        "jd":      analysis.get("jd")      is not None,
        "company": analysis.get("company") is not None,
        "gap":     analysis.get("gap")     is not None,
        "pitch":   analysis.get("pitch")   is not None,
        "exists":  True,
    }



