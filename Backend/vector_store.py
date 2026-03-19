from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

def store_embeddings(chunks):
    FAISS.from_texts(chunks, embeddings).save_local("faiss_index")