import os
import sys
import chromadb
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup
client = chromadb.PersistentClient(path="./data/rag_docs")
collection = client.get_or_create_collection(name="iiitk_docs")
model = SentenceTransformer('all-MiniLM-L6-v2')
pdf_dir = "./data/pdfs"

if not os.path.exists(pdf_dir):
    os.makedirs(pdf_dir)
    print(f"📁 Created {pdf_dir}. Please add PDFs there and run this again.")
    sys.exit()

print("🔄 Processing PDFs...")
for filename in os.listdir(pdf_dir):
    if filename.endswith(".pdf"):
        filepath = os.path.join(pdf_dir, filename)
        print(f"📄 Reading {filename}...")
        
        reader = PdfReader(filepath)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
            
        # Chunking (Split into 500-character pieces)
        chunk_size = 500
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
        
        # Add to Vector DB
        ids = [f"{filename}_{i}" for i in range(len(chunks))]
        embeddings = model.encode(chunks).tolist()
        
        collection.upsert(documents=chunks, ids=ids, embeddings=embeddings)

print("✅ Ingestion Complete! RAG is ready.")
