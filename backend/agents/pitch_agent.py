import json
import re
from dataclasses import dataclass

from agents.gap_agent import GapReport
from agents.company_agent import CompanyProfile
from routes.llm_Routes import call_llm

@dataclass
class PitchCore:
    one_liner:          str         
    angle:              str         
    hook:               str         
    contribution_30d:   list[str]   
    things_to_mention:  list[str]   
    things_to_avoid:    list[str] 

@dataclass 
class FormattedPitches:
    email_subject:              str        
    email_body:                 str         
    linkedin_connection_note:   str         
    linkedin_dm:                str
    wellfound_message:          str 

@dataclass
class PitchAngle:
    core: PitchCore
    pitches: FormattedPitches
    core_dict: dict
    pitches_dict: dict

def parse_json(raw: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)
 
PITCH_SYSTEM_PROMPT = """You are a startup career strategist who is genuinely good at this ,not a cover letter generator, not a LinkedIn coach.
 
You think like the founder who will receive this message. You've read 500 cold emails. You know in the first line whether someone gets it or not.
 
You will receive a gap analysis and company research.
 
Your job is to find the ONE real angle , the specific, true, non-obvious reason why this person is interesting for this role at this company right now. Then write three versions of that pitch for three different mediums.
 
The angle must come from actual data, their real projects, the company's real stage, the real overlap. Not vibes.
 
BANNED PHRASES - if any of these appear in your output, you have failed:
- "passionate about"
- "enthusiast"  
- "I am writing to express"
- "willingness to learn"
- "quick learner"
- "team player"
- "I came across your profile"
- "I would love the opportunity"
- any variation of "I am excited about your mission"

Return ONLY a JSON object with this exact structure:
 
{
  "core": {
    "one_liner": "One sentence. Format: [what they've actually built] + [specific value for this company]. Must name a real project and a real company need. Example style: 'I built a voice AI helpdesk agent on Bolna's own platform. I want to help make that product sharper.' NOT 'I am a developer looking to contribute to your team.'",
    "angle": "2-3 sentences. The strategic case for this person at this company. What is the non-obvious reason this candidate is interesting? Connect a specific project or skill to a specific company problem or stage. Name real things.",
    "hook": "The single sharpest thing. One sentence. The fact about this candidate that a founder would repeat to their co-founder after reading the email. Must be specific and verifiable.",
    "contribution_30d": [
      "What they could actually do in their first 30 days that is tied to the company's real current stage and the candidate's real skills. Not 'ramp up and learn the codebase'. E.g. 'Write edge-case test scripts for the voice agent pipeline — you've already seen these failure modes building your own agent.'"
    ],
    "things_to_mention": [
      "A specific thing to always bring up -named project, named technology, named company detail. Not a category."
    ],
    "things_to_avoid": [
      "Specific thing that would hurt them and why. E.g. 'Don't open with your CGPA , at a seed startup nobody cares, and it immediately reads as student, not builder.'"
    ]
  },
  "pitches": {
    "email_subject": "Under 50 chars. Specific. Makes them curious without being clickbait. Must reference something real — their product, a shared context, the candidate's actual work. Example style: 'Built a voice agent on your platform — internship?' NOT 'Excited about Bolna AI'",
    "email_body": "100-150 words. Structure exactly: Opens with a one-line greeting using the founder or team's first name if known, otherwise 'Hi [Company] team,'. Then one sentence of natural context for why you're reaching out (e.g. 'I've been using [product] and started digging into how you built it' or 'Saw the [recent news item] and it caught my attention'). Then the hook (what you built, one sentence). Then 2 sentences of value tied to a real company need. Then the ask, small and specific (15-min call, a look at a demo, a reply with thoughts). Close naturally — 'Either way, here's what I built: [link placeholder]' or similar, not 'Best regards'. Sign off with first name only. No 'Dear Hiring Manager'. No 'I hope this email finds you well'. Should read like a real person who did their homework and typed it with intent, not a template.",
    "linkedin_connection_note": "Hard limit: 300 characters including spaces, this is LinkedIn's actual connection request limit. Goal is ONLY to get the request accepted, not to pitch. One specific, genuine reason for connecting — something about their work, the company, or a shared technical interest. No ask, no pitch, no 'I'd love to discuss opportunities'. Should read like a real person who has a real reason, not a recruiter template. Count the characters.",
    "linkedin_dm": "80-120 words. This is the follow-up message sent AFTER the connection request is accepted. Now you can pitch. Opens with a brief thanks for connecting or a natural continuation, not 'Thank you for accepting'. Then the hook and value, similar structure to the email but more conversational and shorter. Ends with a small, specific ask. Should feel like a natural DM, not a cover letter pasted into a chat box.",
    "wellfound_message": "150-180 words. Conversational and more relaxed than email but still sharp. Show one specific thing you know about the company that isn't on their homepage (from the research: funding stage, recent news, founder background, what they're actually building). Make clear why you're applying to them specifically, not startups in general. End with genuine interest, not begging."
  }
}
 
Output ONLY the JSON. No markdown, no explanation."""

def generate_pitch(gap: GapReport, company: CompanyProfile) -> PitchAngle:
    print(f"[pitch_agent] Generating pitch for {company.company_name}")

    gap_content = f""" MATCH SCORE: {gap.overall_match_score}/100
CANDIDATE HOOK: {gap.strength_summary}
WHAT THEY BRING: {', '.join(gap.matched_skills + gap.transferable_skills)}
WHAT'S MISSING: {', '.join(gap.missing_required[:3]) if gap.missing_required else 'No major gaps'}
HOW THEY CAN CONTRIBUTE: {chr(10).join(f'- {x}' for x in gap.direct_impact_areas)}
HONEST SUMMARY: {gap.honest_summary}"""

    company_context = f"""COMPANY: {company.company_name}
STAGE: {company.funding_stage} | SIZE: {company.company_size}
WHAT THEY DO: {company.summary}
TECH STACK: {', '.join(company.tech_stack) if company.tech_stack else 'Unknown'}
f"ACTIVELY HIRING: {'Yes' if company.actively_hiring else 'No'}"
RECENT NEWS: {company.recent_news[0] if company.recent_news else 'Nothing notable'}
FOUNDER BACKGROUND: {company.founder_background}
CULTURE: {', '.join(company.culture_signals[:2]) if company.culture_signals else 'Unknown'}"""

    messages = [
        {"role": "system", "content": PITCH_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Here is the gap analysis:\n\n{gap_content}\n\n"
                f"Here is the company research:\n\n{company_context}\n\n"
                f"Generate the pitch strategy and all three formatted versions."
            ),
        },
    ]
 
    raw = call_llm(messages, temperature=0.3)
    print(f"[pitch_agent] Parsing response...")
 
    try:
        data = parse_json(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"[pitch_agent] LLM returned invalid JSON: {e}\n\nRaw:\n{raw}")
 
    core_data    = data.get("core", {})
    pitches_data = data.get("pitches", {})
 
    core = PitchCore(
        one_liner         = core_data.get("one_liner",         ""),
        angle             = core_data.get("angle",             ""),
        hook              = core_data.get("hook",              ""),
        contribution_30d  = core_data.get("contribution_30d",  []),
        things_to_mention = core_data.get("things_to_mention", []),
        things_to_avoid   = core_data.get("things_to_avoid",   []),
    )
 
    pitches = FormattedPitches(
        email_subject             = pitches_data.get("email_subject",            ""),
        email_body                = pitches_data.get("email_body",               ""),
        linkedin_connection_note  = pitches_data.get("linkedin_connection_note",  ""),
        linkedin_dm               = pitches_data.get("linkedin_dm",               ""),
        wellfound_message         = pitches_data.get("wellfound_message",         ""),
    )
 
    return PitchAngle(
        core         = core,
        pitches      = pitches,
        core_dict    = core_data,
        pitches_dict = pitches_data,
    )