import streamlit as st
import requests

# Page Config
st.set_page_config(page_title="IIIT Kalyani Companion", page_icon="🎓")

# Sidebar
with st.sidebar:
    st.image("https://iiitkalyani.ac.in/images/logo.png", width=100)
    st.title("Campus Companion")
    st.markdown("Ask about:\n- 📞 Faculty Contacts\n- 📍 Campus Locations\n- 📜 Academic Rules (PDF)")

# Chat Interface
st.header("🎓 IIIT Kalyani AI Assistant")

if "messages" not in st.session_state:
    st.session_state.messages = []

# Display History
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Input Handling
if prompt := st.chat_input("Ex: Where is the library?"):
    # Show User Message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Fetch AI Response
    with st.spinner("Thinking..."):
        try:
            response = requests.post("http://localhost:8000/api/chat", json={"text": prompt})
            if response.status_code == 200:
                data = response.json()
                ai_msg = data["answer"]
            else:
                ai_msg = "⚠️ Server Error. Is the backend running?"
        except Exception as e:
            ai_msg = f"⚠️ Connection Error: {e}"

    # Show AI Message
    st.session_state.messages.append({"role": "assistant", "content": ai_msg})
    with st.chat_message("assistant"):
        st.markdown(ai_msg)
