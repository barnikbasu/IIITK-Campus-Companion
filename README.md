# 🎓 IIIT Kalyani Campus Companion

An AI-powered assistant for IIIT Kalyani students to find contacts, locations, and academic rules.

## 🛠️ Tech Stack
- **Frontend:** Vite + React + TypeScript + TailwindCSS
- **Icons/Animations:** lucide-react, motion
- Note: This repo currently contains the frontend only. Any backend/LLM integration is future work.

## 🚀 Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

## ✏️ Where to edit content

- Navigation tabs and sections: `src/App.tsx`
- Quick links shown on the hero: `QUICK_LINKS` array in `src/App.tsx`
- Notices preview on dashboard: `NOTICES` array in `src/App.tsx`
- Directory/contacts: `CONTACTS` array in `src/App.tsx`

You can add new tabs/features by:
1) Extending the `activeTab` options in `src/App.tsx`
2) Adding a corresponding section render block for that tab
3) Creating/editing data arrays for cards/links

## 📌 Roadmap (planned)
- Class schedule
- Mess menu
- Notices & Events (admin mode)
- Academic resources
- Opportunities (admin mode)
- Task manager
- Lost & Found
- Buy & Sell
- AI chatbot and college email auth
- Push notifications
