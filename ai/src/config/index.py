import os
import sys
import json


def get_config_path():
    if getattr(sys, "frozen", False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "..", "..")
        )
    return os.path.join(base_path, "config.json")


config_path = get_config_path()

with open(config_path, "r") as f:
    config = json.load(f)

AI_SERVER_HOST = config.get("AI_SERVER_HOST")
AI_SERVER_PORT = int(config.get("AI_SERVER_PORT"))
