from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
from fastapi.responses import JSONResponse

limiter = Limiter(key_func=get_remote_address)

def rate_limit_exceeded_handler(request:Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={
            "Detail": "You've hit the rate limit.Pitchmate is a free tool , please wait a bit before trying again",
            "retry_after" : str(exc.limit.limit),
        }
    )

