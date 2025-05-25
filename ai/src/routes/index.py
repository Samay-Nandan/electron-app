from fastapi import FastAPI
from src.routes.health.index import router as health_router

def register_routes(app: FastAPI) -> None:
    app.include_router(health_router, prefix="/api", tags=["health"])
