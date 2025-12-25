from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Faculty, Location
from core.rag import query_rag

app = FastAPI()

class ChatRequest(BaseModel):
    text: str

@app.post("/chat")
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    query = req.text.lower()
    response = ""
    intent = "unknown"

    # --- LEVEL 1: DATABASE SEARCH ---
    if any(w in query for w in ["email", "contact", "phone", "professor", "faculty"]):
        intent = "contact"
        results = db.query(Faculty).all()
        matches = [f for f in results if f.name.lower() in query or f.dept.lower() in query]
        if matches:
            f = matches[0]
            response = f"👤 **{f.name}** ({f.dept})\n📧 {f.email}\n📍 {f.cabin}"
        else:
            response = "❌ Contact not found in database."

    elif any(w in query for w in ["where", "location", "hostel", "library", "address"]):
        intent = "location"
        results = db.query(Location).all()
        matches = [l for l in results if l.name.lower() in query]
        if matches:
            l = matches[0]
            response = f"📍 **{l.name}**\n{l.desc}"
        else:
            response = "❌ Location unknown."

    # --- LEVEL 2: RAG (PDF) SEARCH ---
    else:
        intent = "rag"
        docs = query_rag(req.text)
        if docs:
            context = "\n\n".join(docs)
            response = f"📚 **According to documents:**\n{context}..."
        else:
            response = "🤖 I couldn't find relevant info in the DB or PDFs."

    return {"answer": response, "intent": intent}

