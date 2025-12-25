import chromadb
from sentence_transformers import SentenceTransformer

# Setup Vector DB
client = chromadb.PersistentClient(path="./data/rag_docs")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
collection = client.get_or_create_collection(name="iiitk_docs")

def query_rag(text: str):
    """Search PDF chunks for the answer"""
    embedding = embedding_model.encode([text]).tolist()
    results = collection.query(query_embeddings=embedding, n_results=2)
    
    if results['documents'] and results['documents'][0]:
        return results['documents'][0] # Returns list of text chunks
    return None

