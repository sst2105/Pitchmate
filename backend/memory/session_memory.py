from dataclasses import dataclass, field
from typing import Optional

@dataclass
class UserSession:
    """
    Holds all agent outputs for one session. Everything is Optional - modules populate fields as they run. """

    resume: Optional[dict] = None
    jd: Optional[dict] = None
    company: Optional[dict] = None
    gap: Optional[dict] = None
    pitch: Optional[dict] = None

_sessions: dict[str, UserSession] = {}

def get_session(session_id:str) -> UserSession:
    if session_id not in _sessions:
        _sessions[session_id] = UserSession()
    return _sessions[session_id]

def update_session(session_id:str, **kwargs) -> UserSession:
    session = get_session(session_id)
    for key, value in kwargs.items():
        if hasattr(session, key):
            setattr(session, key, value)
    return session 

def clear_session(session_id:str) -> None:
    _sessions.pop(session_id, None)

def session_status(session_id:str) -> dict:
    session =  get_session(session_id)
    return{
        "resume": session.resume is not None,
        "jd" : session.jd is not None, 
        "company": session.company is not None,
        "gap": session.gap is not None,
        "pitch" : session.pitch is not None, 
    }
