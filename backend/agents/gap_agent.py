import json
import re
from dataclasses import dataclass

from agents.jd_agent import JDAnalysis
from agents.resume_agent import ResumeProfile
from routes.llm_Routes import call_llm


@dataclass
class GapReport:
    
    matched_skills:         list[str]   
    transferable_skills:    list[str]   

    
    missing_required:       list[str]  
    missing_preferred:      list[str]   

    
    experience_gap:         str         
    narrative_gap:          str         

    suggestions:            list[str]   
    direct_impact_areas:    list[str]   


    overall_match_score:    int         
    strength_summary:       str        
    honest_summary:         str   


def _parse_json(raw: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)


GAP_SYSTEM_PROMPT = """You are a sharp, caring senior friend who works in tech, someone who has hired before, knows how startups think, and genuinely wants to help this person land the role.
 
You are NOT writing a performance review. You are NOT a recruiter scoring a candidate.
You are talking directly TO the person ,like you're sitting across from them at a coffee shop, their resume and the JD printed out in front of you, and you're giving them the real talk.
 
Use "you" and "your" throughout. Warm but honest. Direct but never harsh.
The tone should feel like: "Okay, here's what I actually think, and here's exactly what I'd do if I were you."
 
You will receive a job description analysis and a resume analysis.

Return ONLY a JSON object with these exact fields:

{
  "matched_skills": [
     "Write each match as a natural observation , e.g. 'Your FastAPI experience is exactly what they want here , you've actually shipped APIs with it, not just learned it.' Not a list of keywords."
  ],
  "transferable_skills": [
    "Explain the transfer naturally - e.g. 'You built with ChromaDB which is vector search , they use Pinecone but it's the same mental model, you'd pick it up in a day.' Make the connection clear.
  ],
  "missing_required": [
   "Be honest but not discouraging , e.g. 'You haven't worked with Redis yet, and they specifically want it for their queue system. It's learnable in a weekend but worth doing before you apply.' Specific, actionable tone."
  ],
  "missing_preferred": [
     "Frame as low-stakes - e.g. 'They mention Kubernetes as preferred , you don't have it but honestly at this stage they probably just want someone who isn't scared of infra. Not a dealbreaker.'"
  ],
  "experience_gap": "One honest paragraph about experience-level mismatch. Is the candidate's experience too thin, wrong type, or missing production context? If no gap, say so.",
  "narrative_gap": "Explain how their resume currently reads vs how it needs to read for this specific role. E.g. 'Right now your resume reads like a generalist who does a bit of everything, Python here, some ML there, a bit of frontend. This JD wants someone who screams backend + AI. You need to reorder and reframe so that story comes through immediately.' Specific, visual, actionable.",
  "suggestions": [
    "Give each suggestion like advice from a friend , e.g. 'Before you apply, spend two days with Redis. Do the official tutorial, then add a simple caching layer to your HRMS project. Now you can say you have Redis experience and actually mean it.' Concrete enough that they know exactly what to do tonight."
  ],
  "direct_impact_areas": [
     "Paint a specific picture — e.g. 'Your Voice AI Helpdesk project is basically a proof of concept for what Bolna sells. In your first 30 days you could be writing edge-case test scripts for their agent pipeline , you already understand the failure modes from building your own.' Make them feel the possibility, not just hear about it."
  ],
  "overall_match_score": 67,
  "strength_summary":"Tell them what genuinely stands out — speak to them directly. E.g. 'Here is what would actually make a founder stop and read your resume twice: you built a voice AI agent on their platform. That is not a coincidence, that is a signal , and you should make sure they know you did it deliberately.' Make them feel their real strengths.",
  "honest_summary": "End like a good mentor would — a clear verdict, the one thing that matters most, and a send-off that's encouraging without being fake but honest no sugar coating. E.g. 'Honestly? You are closer to ready than you think. The gap is not your skills, it is your narrative. Spend one evening reframing your resume around voice AI and LLMs specifically, and then apply."
}

Calibration rules for overall_match_score:
- 80-100: Strong match. Apply now.
- 60-79: Good fit with real gaps, worth applying if you address 1-2 things first
- 40-59: Significant mismatch, apply only with a strong angle that explain the gap or improve skills and urge to apply later. 
- Below 40: Fundamental mismatch , wrong level, wrong stack, wrong domain. Flag and say this kindly. 

Hard rules:
- Always use "you/your" - never "the candidate" or third person
- Do NOT inflate the score to be encouraging. A student making a real career decision needs a real number.
- matched_skills must only include skills that are genuinely evidenced in the resume , not assumed.
- direct_impact_areas must be specific to this company and this candidate and not generic "you could contribute to the team."
- Every suggestion must be specific enough to act on tonight — no "improve your skills" type advice
- Output ONLY the JSON. No markdown, no explanation."""


def analyze_gap(jd: JDAnalysis, resume: ResumeProfile) -> GapReport:
    print(f"[gap_agent] Analysing gap: {resume.name} vs {jd.role_title} at {jd.company_name}")

    jd_context = f"""ROLE: {jd.role_title} at {jd.company_name}
RESPONSIBILITIES: {', '.join(jd.responsibilities)}
REQUIRED SKILLS: {', '.join(jd.required_skills)}
PREFERRED SKILLS: {', '.join(jd.preferred_skills)}
SOFT SKILLS WANTED: {', '.join(jd.soft_skills)}
EXPERIENCE NEEDED: {jd.experience_needed}
EDUCATION: {jd.education}
CULTURE SIGNALS: {', '.join(jd.culture_signals)}
RED FLAGS IN JD: {', '.join(jd.red_flags) if jd.red_flags else 'None noted'}
JD SUMMARY: {jd.summary}"""

    resume_context = f"""CANDIDATE: {resume.name}
SENIORITY LEVEL: {resume.seniority_level}
TOTAL EXPERIENCE: ~{resume.total_experience_years} years (LLM estimate)
SKILLS: {', '.join(resume.skills)}
EXPERIENCE:
{chr(10).join(f'- {e}' for e in resume.experience)}
PROJECTS:
{chr(10).join(f'- {p}' for p in resume.projects)}
EDUCATION: {', '.join(resume.education)}
CERTIFICATIONS: {', '.join(resume.certifications) if resume.certifications else 'None'}"""

    messages = [
        {"role": "system", "content": GAP_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Here is the job description analysis:\n\n{jd_context}\n\n"
                f"Here is the candidate's resume analysis:\n\n{resume_context}\n\n"
                f"Do a thorough gap analysis and return the JSON."
            ),
        },
    ]

    raw = call_llm(messages, temperature=0.2)

    print(f"[gap_agent] Parsing response...")

    try:
        data = _parse_json(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"[gap_agent] LLM returned invalid JSON: {e}\n\nRaw:\n{raw}")

    return GapReport(
        matched_skills       = data.get("matched_skills",       []),
        transferable_skills  = data.get("transferable_skills",  []),
        missing_required     = data.get("missing_required",     []),
        missing_preferred    = data.get("missing_preferred",    []),
        experience_gap       = data.get("experience_gap",       ""),
        narrative_gap        = data.get("narrative_gap",        ""),
        suggestions          = data.get("suggestions",          []),
        direct_impact_areas  = data.get("direct_impact_areas",  []),
        overall_match_score  = int(data.get("overall_match_score", 0)),
        strength_summary     = data.get("strength_summary",     ""),
        honest_summary       = data.get("honest_summary",       ""),
    )