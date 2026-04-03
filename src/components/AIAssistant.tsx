import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ICONS } from '../constants';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  'faculty': "IIIT Kalyani has a dedicated team of faculty members in CSE and ECE departments. You can find the full list in the **Faculty Directory** tab.",
  'courses': "We offer B.Tech programs in **Computer Science & Engineering (CSE)** and **Electronics & Communication Engineering (ECE)**. We also have Ph.D. programs.",
  'hostel': "IIIT Kalyani provides hostel facilities for students. The hostels are equipped with basic amenities, Wi-Fi, and common rooms.",
  'canteen': "The campus canteen offers a variety of veg and non-veg options. You can check the today's menu in the **Canteen** tab.",
  'admission': "Admissions to B.Tech programs are done through **JoSAA/CSAB** based on JEE Main ranks.",
  'location': "IIIT Kalyani is located in Kalyani, West Bengal. The campus is currently operating from the Webel IT Park.",
  'contact': "You can contact the administration at **office@iiitkalyani.ac.in** or visit the official website at iiitkalyani.ac.in.",
  'placement': "The Training & Placement cell handles campus recruitments. Many students get placed in top tech companies like Amazon, Jio, and more.",
  'events': "We have various cultural and technical fests like **Regalia** and **Continuum**. Check the **Notices** tab for upcoming events.",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm your IIIT Kalyani Campus Assistant. How can I help you today? You can ask me about faculty, courses, campus facilities, or general college information.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate thinking
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let responseText = "I'm sorry, I don't have specific information about that yet. Try asking about 'faculty', 'courses', 'hostel', 'canteen', or 'placement'.";

      for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
        if (lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      const modelMessage: Message = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <ICONS.AI className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none">Campus AI Assistant</h3>
            <p className="text-xs text-indigo-100 mt-1 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Online • Powered by Gemini
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <ICONS.Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === 'user' ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className={cn(
              "p-4 rounded-3xl shadow-sm leading-relaxed text-sm",
              msg.role === 'user' 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
            )}>
              <div className="markdown-body">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm rounded-tl-none">
              <div className="flex gap-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></motion.span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about IIIT Kalyani..."
            className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2 text-sm font-medium text-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-3 rounded-xl transition-all active:scale-95 shadow-md",
              input.trim() && !isLoading 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            <ICONS.ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
          AI can make mistakes. Verify important info from official sources.
        </p>
      </div>
    </div>
  );
}
