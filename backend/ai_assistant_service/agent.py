import os
from typing import List, Dict, Any
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from .prompts import SYSTEM_PROMPT
from .tools import tools
from .rag_engine import rag_engine

class TrafficCommandAgent:
    def __init__(self, model_name: str = "gpt-4-turbo-preview"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.1)
        self.tools = tools
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_PROMPT),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        agent = create_openai_tools_agent(self.llm, self.tools, prompt)
        self.executor = AgentExecutor(agent=agent, tools=self.tools, verbose=True)

    def run(self, user_input: str, chat_history: List = None) -> str:
        """Executes the agent with RAG context and tools."""
        # 1. Retrieve context from RAG
        rag_context = rag_engine.query(user_input)
        
        # 2. Augment input with RAG context
        augmented_input = f"""
        CONTEXT FROM RULEBOOKS/SOPs:
        {rag_context}
        
        USER QUERY:
        {user_input}
        """
        
        # 3. Run the agent
        response = self.executor.invoke({
            "input": augmented_input,
            "chat_history": chat_history or []
        })
        
        return response["output"]

# Singleton instance
agent = TrafficCommandAgent()
