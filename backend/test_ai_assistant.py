import sys
import os
sys.path.append(os.getcwd())

from backend.ai_assistant_service.agent import agent
from backend.ai_assistant_service.rag_engine import rag_engine

def test_assistant():
    print("--- Testing AI Assistant Logic ---")
    
    # Mock RAG query
    print("\n[RAG Test] Querying 'emergency vehicle priority'...")
    context = rag_engine.query("emergency vehicle priority")
    print(f"Context found: {context[:200]}...")

    # Mock Agent run (Requires OPENAI_API_KEY)
    if not os.getenv("OPENAI_API_KEY"):
        print("\n[Agent Test] Skipping because OPENAI_API_KEY is not set.")
        return

    print("\n[Agent Test] Asking: 'What happens when an ambulance is detected?'")
    response = agent.run("What happens when an ambulance is detected?")
    print(f"Assistant Response: {response}")

if __name__ == "__main__":
    test_assistant()
