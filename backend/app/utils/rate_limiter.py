import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

class InMemoryRateLimiter:
    def __init__(self, requests_per_minute: int = 30):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)

    def check(self, key: str):
        now = time.time()
        window = now - 60
        # Filter requests older than 1 minute
        self.requests[key] = [t for t in self.requests[key] if t > window]
        
        if len(self.requests[key]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please wait a moment before sending another request."
            )
        self.requests[key].append(now)

ai_rate_limiter = InMemoryRateLimiter(requests_per_minute=30)
form_rate_limiter = InMemoryRateLimiter(requests_per_minute=10)

def check_ai_rate_limit(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    ai_rate_limiter.check(client_ip)

def check_form_rate_limit(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    form_rate_limiter.check(client_ip)
