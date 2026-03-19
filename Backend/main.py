from fastapi import FastAPI, UploadFile
from parser import extract_text
from chunker import chunk_text
from summarizer import summarize_chunks
from vector_store import store_embeddings

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile):
    text = extract_text(file.file)
    chunks = chunk_text(text)
    store_embeddings(chunks)
    summary = summarize_chunks(chunks)
    return {"summary": summary}