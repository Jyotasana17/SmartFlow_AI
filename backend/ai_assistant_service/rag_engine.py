import os
from typing import List
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import CharacterTextSplitter

class RAGEngine:
    def __init__(self, persist_directory: str = "./chroma_db"):
        self.persist_directory = persist_directory
        self.embeddings = OpenAIEmbeddings()
        self.vector_store = None
        
        if os.path.exists(persist_directory):
            self.vector_store = Chroma(
                persist_directory=persist_directory,
                embedding_function=self.embeddings
            )

    def ingest_documents(self, folder_path: str):
        """Loads and indexes documents from a folder."""
        documents = []
        for file in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file)
            if file.endswith(".pdf"):
                loader = PyPDFLoader(file_path)
                documents.extend(loader.load())
            elif file.endswith(".txt"):
                loader = TextLoader(file_path)
                documents.extend(loader.load())
        
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        texts = text_splitter.split_documents(documents)
        
        self.vector_store = Chroma.from_documents(
            documents=texts,
            embedding=self.embeddings,
            persist_directory=self.persist_directory
        )
        print(f"Ingested {len(texts)} chunks from {folder_path}")

    def query(self, text: str, k: int = 3) -> str:
        """Retrieves relevant context for a given query."""
        if not self.vector_store:
            return "No documents indexed in knowledge base."
        
        results = self.vector_store.similarity_search(text, k=k)
        context = "\n---\n".join([doc.page_content for doc in results])
        return context

rag_engine = RAGEngine()
