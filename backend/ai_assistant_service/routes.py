import os
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
from .agent import agent
from .rag_engine import rag_engine

router = APIRouter(prefix="/api/v1/assistant", tags=["AI Assistant"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Convert Pydantic history to LangChain messages format if needed
        # For simplicity, we just pass the raw history here or handle it in agent.py
        history = [(m.role, m.content) for m in request.history]
        
        ai_response = agent.run(request.message, chat_history=history)
        return ChatResponse(response=ai_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ingest")
async def ingest_docs(background_tasks: BackgroundTasks, folder_path: str = "./knowledge-base"):
    """Trigger document ingestion in the background."""
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        return {"message": f"Folder {folder_path} created. Please add PDFs/TXTs and try again."}
    
    background_tasks.add_task(rag_engine.ingest_documents, folder_path)
    return {"message": "Ingestion started in background."}
