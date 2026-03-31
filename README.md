# Gemini Summarizer Agent 🚀

A professional-grade AI agent built with **ADK** and **Gemini 3 Flash**, hosted on **Google Cloud Run**. This agent is designed to solve information overload by providing high-quality, structured text summarization through a specialized technical dashboard.

## 🏆 Hackathon Compliance Checklist

| Requirement | Status | Implementation Detail |
| :--- | :---: | :--- |
| **Single AI Agent** | ✅ | **Gemini Summarizer Agent**: A specialized agent focused on professional text synthesis. |
| **ADK Implementation** | ✅ | Uses ADK patterns (System Instructions, Tool-Using/Function Calling, and Structured Output) via the `@google/genai` SDK. |
| **Gemini Inference** | ✅ | Powered by **Gemini 3 Flash** (`gemini-3-flash-preview`) for high-speed reasoning. |
| **Cloud Run Hosting** | ✅ | Fully deployed and accessible via a production-ready Cloud Run URL. |
| **Defined Task** | ✅ | **Text Summarization**: Extracts key insights and structured takeaways from long-form text. |
| **HTTP Endpoint** | ✅ | Callable via the main App URL and a dedicated **`/api/health`** metadata endpoint. |
| **Input/Response Flow** | ✅ | Features a clear "Input Buffer" → "Execute Agent" → "Structured Response" workflow. |

## 🌟 Features

- **Professional Summarization**: Leverages Gemini 3 Flash to synthesize long-form text into clear, actionable insights.
- **Technical Dashboard UI**: A high-density, professional interface designed for productivity and focus.
- **Full-Stack Architecture**: Built with a React frontend and an Express backend for robust deployment.
- **Markdown Support**: Outputs summaries with professional formatting, including headers and bullet points.
- **System Monitoring**: Includes a dedicated `/api/health` endpoint for deployment health checks.
- **Productivity Tools**: One-click copy, buffer clearing, and full-screen expansion modes.

## 🛠️ Tech Stack

- **AI Model**: Gemini 3 Flash (`@google/genai`)
- **Framework**: ADK (Agent Development Kit)
- **Frontend**: React 19, Tailwind CSS 4.0, Lucide Icons, Motion
- **Backend**: Node.js, Express
- **Deployment**: Google Cloud Run

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- A Gemini API Key from [Google Cloud Console](https://ai.google.dev/)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file or set your secrets in your environment:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running Locally

To start the development server (Full-stack mode):
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 📡 API Endpoints

- `GET /api/health`: Returns the system status and agent metadata.

## 🛡️ Security

This project implements robust security practices:
- **Runtime Secret Injection**: API keys are injected at the server level and never hardcoded in the source.
- **Environment Isolation**: Uses `.env.example` to prevent accidental credential leakage.

## 📄 License

This project is licensed under the Apache-2.0 License.
