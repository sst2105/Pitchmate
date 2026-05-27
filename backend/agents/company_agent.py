import json
import os
import re
from dataclasses import dataclass

from tavily import TavilyClient

from routes.llm_Routes import call_llm


@dataclass
class CompanyProfile:
    company_name:           str
    industry:               str
    company_size:           str
    funding_stage:          str
    tech_stack:             list[str]
    culture_signals:        list[str]
    red_flags:              list[str]
    recent_news:            list[str]
    actively_hiring:        bool
    hiring_signals:         list[str]
    careers_url:            str
    glassdoor_signals:      list[str]
    funding_health:         str
    headcount_trajectory:   str
    engineering_activity:   str
    founder_background:     str
    summary:                str
    data_confidence:        str   # high / medium / low — honest signal for new/unknown startups


def _parse_json(raw: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)


def _tavily_search(client: TavilyClient, query: str, max_results: int = 5) -> str:
    """
    Run one Tavily search and return results as a clean text block.
    Tavily returns structured summaries — no HTML parsing needed.
    """
    try:
        response = client.search(
            query=query,
            search_depth="advanced",
            max_results=max_results,
            include_answer=True,    # Tavily's own summary of results
        )
        parts = []

        if response.get("answer"):
            parts.append(f"Summary: {response['answer']}")

        for r in response.get("results", []):
            title = r.get("title", "")
            content = r.get("content", "")
            url = r.get("url", "")
            if content:
                parts.append(f"[{title}] {content} (source: {url})")

        return "\n\n".join(parts) if parts else "No results found."

    except Exception as e:
        # Don't crash the whole pipeline if one search fails
        print(f"[company_agent] Tavily search failed for query '{query}': {e}")
        return f"Search unavailable: {e}"


SYNTHESIS_PROMPT = """You are a company intelligence analyst helping students make smart decisions before applying.

You have been given raw search results about a company from three targeted searches:
1. Funding and growth signals
2. Founder background and team
3. Recent news and product activity

Your job is to synthesise this into structured intelligence. Do NOT repeat marketing copy.
Surface what a VC analyst or a smart friend who worked there would tell you.

Return ONLY a JSON object with these exact fields:

{
  "company_name": "Official company name",
  "industry": "Primary industry or domain",
  "company_size": "Headcount estimate: 1-10, 10-50, 50-200, 200-1000, 1000+",
  "funding_stage": "Bootstrapped, Pre-seed, Seed, Series A, Series B, Series C+, Public, or Unknown",
  "tech_stack": ["only confirmed tech — from job postings, GitHub, or engineering content"],
  "culture_signals": [
    "Specific sourced signal about real work culture — employee review, interview feedback, public post. Not their About page."
  ],
  "red_flags": [
    "Concrete concern: layoffs, executive churn, stalled funding, negative review patterns, legal issues, repeated pivots, hiring freeze"
  ],
  "recent_news": [
    "One real development with rough date — funding, product launch, leadership change, controversy"
  ],
  "actively_hiring": true,
  "hiring_signals": [
    "Specific evidence of hiring activity — number of open roles, LinkedIn posting recency, job boards active"
  ],
  "careers_url": "Direct URL to jobs page if found in search results, else empty string",
  "glassdoor_signals": [
    "What employees actually say. If no Glassdoor data found in search results, say exactly: No Glassdoor data found in search results."
  ],
  "funding_health": "One honest paragraph: last round date, amount, runway signals, headcount growth or decline. If unknown, say so.",
  "headcount_trajectory": "Growing, flat, or declining over last 12 months — based on LinkedIn or news signals found.",
  "engineering_activity": "GitHub activity, engineering blog recency, open-source presence — or note if none found.",
  "founder_background": "Who founded it, domain experience, track record, notable investors or advisors.",
  "summary": "3-4 sentence honest assessment. Lead with the single most important thing a student should know before applying — good or bad.",
  "data_confidence": "high if multiple strong sources found, medium if partial data, low if very little public data exists for this company"
}

Hard rules:
- actively_hiring: true ONLY with concrete current evidence. Default false if unclear.
- red_flags must be honest. Students are making real career decisions.
- Never hallucinate specifics — if the search results don't contain it, use empty list or Unknown.
- data_confidence low means the startup is very new or obscure — flag this honestly so the student knows.
- Output ONLY the JSON. No markdown, no preamble."""


def research_company(company_name: str, role_title: str) -> CompanyProfile:
    print(f"[company_agent] Researching: {company_name} | Role: {role_title}")

    tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

    # Three targeted searches — each hunting different signal
    print(f"[company_agent] Running Tavily searches...")

    funding_results = _tavily_search(
        tavily,
        f"{company_name} startup funding growth 2024 2025 investors headcount",
    )
    founder_results = _tavily_search(
        tavily,
        f"{company_name} founder CEO team background experience",
    )
    news_results = _tavily_search(
        tavily,
        f"{company_name} {role_title} hiring news product recent 2025",
    )

    # Combine all search results into one context block for the LLM
    search_context = f"""=== SEARCH 1: Funding & Growth ===
{funding_results}

=== SEARCH 2: Founder & Team ===
{founder_results}

=== SEARCH 3: Recent News & Hiring ===
{news_results}"""

    print(f"[company_agent] Synthesising with LLM...")

    messages = [
        {"role": "system", "content": SYNTHESIS_PROMPT},
        {
            "role": "user",
            "content": (
                f"Company: {company_name}\n"
                f"Role: {role_title}\n\n"
                f"Here are the search results:\n\n{search_context}"
            ),
        },
    ]

    # Synthesis goes through Groq — fast, structured output
    # OpenRouter fallback handles rate limits automatically
    raw = call_llm(messages, temperature=0.1)

    print(f"[company_agent] Parsing response...")

    try:
        data = _parse_json(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"[company_agent] LLM returned invalid JSON: {e}\n\nRaw:\n{raw}")

    return CompanyProfile(
        company_name           = data.get("company_name",           company_name),
        industry               = data.get("industry",               "Unknown"),
        company_size           = data.get("company_size",           "Unknown"),
        funding_stage          = data.get("funding_stage",          "Unknown"),
        tech_stack             = data.get("tech_stack",             []),
        culture_signals        = data.get("culture_signals",        []),
        red_flags              = data.get("red_flags",              []),
        recent_news            = data.get("recent_news",            []),
        actively_hiring        = bool(data.get("actively_hiring",   False)),
        hiring_signals         = data.get("hiring_signals",         []),
        careers_url            = data.get("careers_url",            ""),
        glassdoor_signals      = data.get("glassdoor_signals",      []),
        funding_health         = data.get("funding_health",         "Unknown"),
        headcount_trajectory   = data.get("headcount_trajectory",   "Unknown"),
        engineering_activity   = data.get("engineering_activity",   "Unknown"),
        founder_background     = data.get("founder_background",     "Unknown"),
        summary                = data.get("summary",                ""),
        data_confidence        = data.get("data_confidence",        "low"),
    )


