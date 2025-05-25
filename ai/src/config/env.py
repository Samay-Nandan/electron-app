import os
from dotenv import load_dotenv

monorepo_root = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)
load_dotenv(dotenv_path=os.path.join(monorepo_root, ".env"))

AI_SERVER_HOST = os.getenv("AI_SERVER_HOST", "localhost")
AI_SERVER_PORT = int(os.getenv("AI_SERVER_PORT", 8000))
