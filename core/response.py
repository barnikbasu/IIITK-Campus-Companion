import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()
token = os.getenv("HUGGINGFACE_API_TOKEN")

# Use a lightweight, fast model
client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3", token=token)

def generate_natural_response(user_query: str, context: str, intent: str):
    """
    Wraps raw data in a natural language sentence.
    """
    if not token:
        # Fallback if no API key is set
        return f"**Data Found:**\n{context}"

    prompt = ""
    if intent == "contact":
        prompt = f"User asked: '{user_query}'. Database found: '{context}'. Reply politely giving the contact info."
    elif intent == "location":
        prompt = f"User asked: '{user_query}'. Database found: '{context}'. Explain where this place is."
    elif intent == "rag":
        prompt = f"User asked: '{user_query}'. Context from documents: '{context}'. Answer the user using ONLY the context. Be brief."

    try:
        messages = [{"role": "user", "content": prompt}]
        response = client.chat_completion(messages, max_tokens=150)
        return response.choices[0].message.content
    except Exception as e:
        return f"{context} (AI Formatting failed: {str(e)})"
