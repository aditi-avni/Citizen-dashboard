import os
from dotenv import load_dotenv

# Get absolute path of current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build path to .env
env_path = os.path.join(BASE_DIR, ".env")

# Load it explicitly
load_dotenv(dotenv_path=env_path)

API_URL = os.getenv("API_URL")
API_KEY = os.getenv("API_KEY")

print("URL:", API_URL)
print("KEY:", API_KEY)