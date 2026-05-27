from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

from routes.jd_routes import router as jd_router 
from routes.resume_routes import router as resume_router
from routes.company_routes import router as company_router
from routes.gap_rotes import router as gap_router
from routes.pipeline_routes import router as pipeline_router
from routes.pitch_routes import router as pitch_router

app = FastAPI(title = "CareerAssitant API", version = "0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://localhost:3000"],
    allow_credentials= True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.include_router(jd_router)
app.include_router(resume_router, prefix="")
app.include_router(company_router, prefix="")
app.include_router(gap_router, prefix = "")
app.include_router(pipeline_router)
app.include_router(pitch_router)

@app.get("/health")
def health():
    return {"status":"ok"}
    
@app.get("/")
def root():
    return {"status": "Career Pilot API running"}