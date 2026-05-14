# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate everyday workplace tasks using AI. Built with a clean, SaaS-style dashboard, it brings together five focused AI tools — email drafting, meeting summarization, task planning, research, and a chat assistant — into a single workspace.

---

## 📌 Project Overview

The **AI Workplace Productivity Assistant** is a one-page web app designed to streamline routine knowledge-work. Instead of switching between multiple tools, professionals can draft emails, summarize meetings, plan their day, run quick research, and chat with an AI assistant from a unified dashboard.

All AI outputs are **structured, editable, and copy-ready**, with a built-in **Responsible AI disclaimer** reminding users to review AI-generated content before relying on it.

---

## ✨ Features

- 🧭 **Modern dashboard UI** with sidebar navigation
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ✏️ **Editable AI outputs** — refine results in-place before using them
- 🧱 **Structured prompts** behind the scenes for consistent, high-quality results
- ⚠️ **Responsible AI disclaimer** for transparent, ethical usage
- 🌗 **Light & dark mode** support

### AI Tools Included

1. **Smart Email Generator** — Draft polished, context-aware emails by choosing tone (formal, friendly, persuasive…) and audience (client, manager, team…).
2. **Meeting Notes Summarizer** — Turn raw notes or transcripts into structured summaries with key decisions, action items, and open questions.
3. **AI Task Planner** — Prioritize tasks (Eisenhower-style) and generate a realistic, time-blocked daily or weekly schedule.
4. **AI Research Assistant** — Summarize topics or pasted articles into TL;DR, key insights, recommendations, and caveats.
5. **AI Chatbot Interface** — A conversational assistant for quick questions, brainstorming, and ad-hoc help.

---

## 🛠️ Tools Used

**Frontend**
- ⚛️ **React 19** + **TypeScript**
- 🚀 **TanStack Start** (full-stack React framework with SSR + server functions)
- 🧭 **TanStack Router** (file-based routing)
- ⚡ **Vite 7** (build tool)
- 🎨 **Tailwind CSS v4** (utility-first styling, OKLCH color tokens)
- 🧩 **shadcn/ui** + **Radix UI** primitives
- 🪶 **Lucide React** (icon set)

**Backend / AI**
- ☁️ **Lovable Cloud** (managed backend infrastructure)
- 🤖 **Lovable AI Gateway** — using `google/gemini-3-flash-preview`
- 🔒 **Zod** for server-side input validation
- 🛡️ TanStack `createServerFn` for typed, secure server-side calls

**Tooling**
- 📦 **Bun** (package manager / runtime)
- 🧹 **ESLint** + **Prettier**

---

## 🚀 Setup Instructions

### Prerequisites
- [Bun](https://bun.sh) (or Node.js 20+)
- A modern browser

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-workplace-productivity-assistant
```

### 2. Install dependencies
```bash
bun install
```

### 3. Configure environment variables
The project uses **Lovable Cloud**, which auto-provisions the required `.env` values:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
LOVABLE_API_KEY=...   # used server-side for the AI Gateway
```

When running on Lovable, these are set automatically. For local self-hosted use, set them in a `.env` file at the project root.

### 4. Run the dev server
```bash
bun run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### 5. Build for production
```bash
bun run build
```

---

## 🧠 How It Works

- The frontend calls a **typed server function** (`generateAi` in `src/lib/ai.functions.ts`).
- The server function validates input with **Zod** and forwards a structured prompt to the **Lovable AI Gateway**.
- Each tool sends a tailored **system prompt** so outputs are consistently formatted (e.g. summaries always include Decisions / Action Items / Risks).
- Responses are rendered in an **editable textarea**, so users can refine before copying.

---

## ⚖️ Responsible AI

AI-generated content can contain inaccuracies or bias. Always **review, verify, and edit** outputs before sharing externally or making decisions based on them. Avoid pasting confidential or personal data you don't want processed by an AI model.

---

## 👥 Team Members

| Name | Role |
|------|------|
| _Your Name_ | Project Lead / Full-Stack Developer |
| _Member 2_ | Frontend Developer |
| _Member 3_ | AI / Prompt Engineer |
| _Member 4_ | UI/UX Designer |

> Replace these placeholders with your actual team details.

---

## 📄 License

This project is provided for educational and demonstration purposes. Adapt freely for your own workplace needs.
