import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from src.routes.index import register_routes
from src.config.env import AI_SERVER_HOST, AI_SERVER_PORT


def create_app() -> FastAPI:
    app = FastAPI(title="AI Engine API")
    register_routes(app)
    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=AI_SERVER_HOST, port=AI_SERVER_PORT, reload=False)
