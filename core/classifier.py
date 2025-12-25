def classify_intent(text: str):
    """
    Decides if the user is asking about:
    1. Contact info (Database)
    2. Locations (Database)
    3. Rules/Academics (PDFs/RAG)
    """
    text = text.lower()
    
    # 1. Contact Keywords
    contact_words = ["email", "phone", "contact", "professor", "faculty", "registrar", "hod", "who is"]
    if any(word in text for word in contact_words):
        return "db_contact"
        
    # 2. Location Keywords
    location_words = ["where", "location", "address", "building", "lab", "library", "hostel", "directions"]
    if any(word in text for word in location_words):
        return "db_location"
        
    # 3. Everything else defaults to RAG (Searching documents)
    return "rag"

