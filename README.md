# Pitchmate

**Your personal guide to applying at startups. Not generic advice, actual intel.**

Most career tools are built to beat ATS systems. Pitchmate is built for a different problem: you found a startup you want to work at, you have a resume, and you have no idea how to pitch yourself in a way that actually lands with a founder.

Pitchmate takes your resume and a job description, researches the company in real time, and tells you exactly where you fit, where you fall short, and how to position yourself for that specific role, formatted for email, LinkedIn, and Wellfound.

**Live demo: [pitchmate-sigma.vercel.app](https://pitchmate-sigma.vercel.app)**

---

## What it does

Five agents. One pipeline. No copy-pasting between tools.

| Agent | What it does |
|---|---|
| **JD Agent** | Parses any job description (URL, PDF, .docx, or raw paste) into structured role intelligence |
| **Resume Agent** | Extracts your skills, projects, experience, and seniority level from your PDF |
| **Company Agent** | Runs 3 targeted searches (funding, founders, recent news) and gives you real company intel, not their About page |
| **Gap Agent** | Compares your resume against the JD like a friend who works in tech. Direct, specific, honest |
| **Pitch Agent** | Generates your pitch strategy and three formatted versions: cold email, LinkedIn note, Wellfound message |

The pipeline is session-aware. Upload your resume once, paste a JD, and every module after that pulls from session. No re-uploading, no starting over.

---

## Why it exists

Most tools ask: "How do I make my resume beat the ATS?"

Pitchmate asks: "I have this resume, this JD, and this company. How do I actually win this specific opportunity?"

The company research goes beyond the careers page. It looks at funding recency, founder background, recent news, and headcount signals. The gap analysis talks to you directly, not about you. The pitch output bans phrases like "passionate about" and "willingness to learn" by design.

---

## Tech stack

| Layer | Tool |
|---|---|
| Backend | FastAPI (Python) |
| Frontend | Next.js 14 |
| LLM (fast) | Groq, llama-3.3-70b-versatile |
| LLM (fallback) | OpenRouter, meta-llama-3.3-70b-instruct:free |
| Web search | Tavily API (3 targeted searches per company analysis) |
| PDF parsing | PyMuPDF |
| Docx parsing | python-docx |
| Rate limiting | SlowAPI |
| Session state | In-memory (Supabase persistence planned) |
| Backend deploy | GCP Cloud Run |
| Frontend deploy | Vercel |


---

## Project structure

```
pitchmate/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── agents/
│   │   ├── jd_agent.py            # JDAnalysis
│   │   ├── resume_agent.py        # ResumeProfile
│   │   ├── company_agent.py       # CompanyProfile (Tavily + Groq)
│   │   ├── gap_agent.py           # GapReport
│   │   └── pitch_agent.py         # PitchAngle (core + 3 formats)
│   ├── routes/
│   │   ├── llm_Routes.py          # Groq, OpenRouter fallback
│   │   ├── pipeline_routes.py     # Session-aware module routing
│   │   ├── pitch_routes.py
│   │   ├── jd_routes.py
│   │   ├── resume_routes.py
│   │   └── company_routes.py
│   ├── memory/
│   │   └── session_memory.py      # In-memory session state
│   ├── utils/
│   │   ├── parsers.py             # URL scraper (Jina Reader)
│   │   └── jd_input_parser.py     # Normalises URL/PDF/.docx to text
│   └── prompts/
│       ├── jd_prompt.py
│       └── resume_prompt.py
└── frontend/                      # Next.js 14
```

---

## Running locally

**1. Clone and set up backend**

```bash
git clone https://github.com/sst2105/Pitchmate.git
cd Pitchmate/backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

**2. Add your API keys**

Create `backend/.env`:

```
GROQ_API_KEY=your_groq_key
OPENROUTER_API_KEY=your_openrouter_key
TAVILY_API_KEY=your_tavily_key
DATABASE_URL=your_supabase_connection_string
```

All free with no credit card required:
- Groq: [console.groq.com](https://console.groq.com)
- OpenRouter: [openrouter.ai](https://openrouter.ai)
- Tavily: [app.tavily.com](https://app.tavily.com)

**3. Start the server**

```bash
uvicorn main:app --reload
```

API docs at `http://localhost:8000/docs`

**4. Set up frontend**

```bash
cd ../frontend
npm install
npm run dev
```

Frontend at `http://localhost:3000`

---

## Using the API directly

Every request needs an `X-Session-ID` header. Generate any UUID and use it consistently across calls. The backend stores your agent outputs against this ID so you never re-upload.

```bash
# 1. Upload resume
curl -X POST http://localhost:8000/pipeline/resume \
  -H "X-Session-ID: your-session-id" \
  -F "resume=@your_resume.pdf"

# 2. Paste JD
curl -X POST http://localhost:8000/pipeline/jd \
  -H "X-Session-ID: your-session-id" \
  -F "jd_text=paste your job description here"

# 3. Company research (auto-extracts company from JD)
curl -X POST http://localhost:8000/pipeline/company \
  -H "X-Session-ID: your-session-id"

# 4. Gap analysis (uses session, no re-upload needed)
curl -X POST http://localhost:8000/pipeline/gap \
  -H "X-Session-ID: your-session-id"

# 5. Pitch generation
curl -X POST http://localhost:8000/pipeline/pitch \
  -H "X-Session-ID: your-session-id"
```

---

## Status

| Feature | Status |
|---|---|
| JD agent (URL, PDF, .docx, raw text) | Live |
| Resume agent (PDF extraction + LLM analysis) | Live |
| Company agent (Tavily search + Groq synthesis) | Live |
| Gap agent (direct, human-friendly gap analysis) | Live |
| Pitch agent (core strategy + email, LinkedIn, Wellfound) | Live |
| Session pipeline (stateful, modular, no redundant uploads) | Live |
| Next.js frontend | Live |
| Rate limiting | Live |
| Cover letter agent | Planned |
| Supabase session persistence | Planned |

---

## Built by

Shreya Sai Thanikella, final-year CS student at JIMS GGSIPU, specialising in Data Analytics and AI Integration.

Built to solve a real problem I kept running into while applying to startups.

[LinkedIn](https://linkedin.com/in/shreya-sai-thanikella) · [GitHub](https://github.com/sst2105)
