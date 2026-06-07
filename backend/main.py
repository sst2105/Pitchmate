from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv
from pathlib import Path
from services.database import create_tables
from contextlib import asynccontextmanager


from routes.jd_routes import router as jd_router 
from routes.resume_routes import router as resume_router
from routes.company_routes import router as company_router
from routes.gap_rotes import router as gap_router
from routes.pipeline_routes import router as pipeline_router
from routes.pitch_routes import router as pitch_router
from utils.rate_limiter import limiter, rate_limit_exceeded_handler 

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(title = "Pitchmate API", version = "0.1.0",lifespan=lifespan)


app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://pitchmate-sigma.vercel.app",  # your main production domain
],
    allow_credentials= True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

create_tables()

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
    return {"status": "Pitchmate API running"}