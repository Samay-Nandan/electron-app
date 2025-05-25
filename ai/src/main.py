from fastapi import FastAPI
from src.routes.index import register_routes

def create_app() -> FastAPI:
    app = FastAPI(title="AI Engine API")
    register_routes(app)
    return app

app = create_app()
