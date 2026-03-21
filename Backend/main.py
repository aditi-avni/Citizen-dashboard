from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        text = content.decode("utf-8", errors="ignore")

        return {
            "summary": [
                text[:150],
                "This is summary point 2",
                "This is summary point 3"
            ]
        }

    except Exception as e:
        return {"summary": [str(e)]}