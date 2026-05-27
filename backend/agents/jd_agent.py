import json
import re
from dataclasses import dataclass 

from routes.llm_Routes import call_llm
from prompts.jd_prompt import JD_SYSTEM_PROMPT

@dataclass 
class JDAnalysis:
    role_title: str
    company_name : str
    responsibilities: list[str]
    required_skills:   list[str]
    preferred_skills:  list[str]
    soft_skills:       list[str]
    experience_needed: str
    education:         str
    culture_signals:   list[str]
    red_flags:         list[str]
    summary:           str
    raw_text_length:   int = 0

def _parse_json(raw: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)

def analyze_jd(jd_text: str) -> JDAnalysis:
    print(f"[jd_agent] Got {len(jd_text)} chars")

    messages = [
        {"role": "system", "content": JD_SYSTEM_PROMPT},
        {"role": "user","content": f" JOB DESCRIPTION:\n\n{jd_text}"}
    ]
    raw = call_llm(messages, temperature = 0.1)

    try:
        data = _parse_json(raw)
    except json.JSONDecodeError as e : 
        raise ValueError(f"LLM returned invalid JSON: {e}\n\nRaw:\n{raw}")
    return JDAnalysis(
        role_title        = data.get("role_title",        "Unknown"),
        company_name      = data.get("company_name",      "Unknown"),
        responsibilities  = data.get("responsibilities",  []),
        required_skills   = data.get("required_skills",   []),
        preferred_skills  = data.get("preferred_skills",  []),
        soft_skills       = data.get("soft_skills",       []),
        experience_needed = data.get("experience_needed", "Not specified"),
        education         = data.get("education",         "Not specified"),
        culture_signals   = data.get("culture_signals",   []),
        red_flags         = data.get("red_flags",         []),
        summary           = data.get("summary",           ""),
        raw_text_length   = len(jd_text),
    )