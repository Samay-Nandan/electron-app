import os
import json

monorepo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
config_path = os.path.join(monorepo_root, "config.json")

with open(config_path, "r") as f:
    config = json.load(f)

AI_SERVER_HOST = config.get("AI_SERVER_HOST")
AI_SERVER_PORT = int(config.get("AI_SERVER_PORT"))
