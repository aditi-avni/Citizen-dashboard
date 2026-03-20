from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

def store_embeddings(chunks):
    FAISS.from_texts(chunks, embeddings).save_local("faiss_index")