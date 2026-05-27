import json
import re
import fitz
from dataclasses import dataclass

from routes.llm_Routes import call_llm
from prompts.resume_prompt import RESUME_SYSTEM_PROMPT


@dataclass
class ResumeProfile:
    name: str
    contact: str
    skills: list[str]
    experience: list[str]
    education: list[str]
    projects: list[str]
    certifications: list[str]
    total_experience_years: float
    seniority_level: str
    raw_text_length: int = 0


def _parse_json(raw: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)


def extract_text(pdf_path: str, max_chars: int = 8000) -> str:
    doc = fitz.open(pdf_path)
    pages = [page.get_text() for page in doc]
    doc.close()

    full_text = "\n".join(pages).strip()
    if not full_text:
        raise ValueError(
            "[resume_agent] PDF text extraction returned empty - likely a scanned image PDF"
        )
    return full_text[:max_chars]


def analyze_resume(pdf_path: str) -> ResumeProfile:
    print(f"[resume_agent] Extracting text from {pdf_path}")
    resume_text = extract_text(pdf_path)
    print(f"[resume_agent] Got {len(resume_text)} chars")

    messages = [
        {"role": "system", "content": RESUME_SYSTEM_PROMPT},
        {"role": "user", "content": f"RESUME TEXT:\n\n{resume_text}"},
    ]

    raw = call_llm(messages, temperature=0.1)

    try:
        data = _parse_json(raw)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"[resume_agent] LLM returned invalid JSON: {e}\n\nRaw:\n{raw}"
        )

    return ResumeProfile(
        name=data.get("name", "Unknown"),
        contact=data.get("contact", "Unknown"),
        skills=data.get("skills", []),
        experience=data.get("experience", []),
        education=data.get("education", []),
        projects=data.get("projects", []),
        certifications=data.get("certifications", []),
        total_experience_years=data.get("total_experience_years", 0.0),
        seniority_level=data.get("seniority_level", "Unknown"),
        raw_text_length=len(resume_text),
    )
