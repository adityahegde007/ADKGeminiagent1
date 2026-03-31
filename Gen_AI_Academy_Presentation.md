# Gen AI Academy - APAC Edition: Project Submission

![Google Cloud Logo](https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png)
**Google Cloud | Gen AI Academy | APAC Edition**
*Build in APAC. Build for the world.*

---

## Participant Details
- **Participant name:** Aditya Hegde (adityahegde007@gmail.com)
- **Problem Statement:** Information overload in the digital age makes it nearly impossible for professionals to quickly extract key insights from long-form documents, research papers, and reports, leading to decreased productivity.

---

## Brief about the idea
The **Gemini Summarizer Agent** is a specialized AI workstation built to solve information density problems. Unlike generic chatbots, this agent is a purpose-built "Summarization Module" that uses Gemini 3 Flash to synthesize complex text into professional, structured summaries. It features a **Technical Dashboard UI** designed for high-focus environments, providing real-time feedback and professional markdown output.

---

## Meeting the Build Criteria
- **ADK Integration:** Implemented a tool-using agent architecture using the Agent Development Kit (ADK) patterns. This includes a specialized "Professional Summarizer" persona defined through system instructions and a functional `get_agent_info` tool for capability discovery.
- **Gemini Inference:** Leveraged `gemini-3-flash-preview` for high-speed, low-latency text synthesis with optimized generation parameters (temperature: 0.2).
- **Cloud Run Deployment:** Built a full-stack architecture (Express + React) to ensure the agent is hosted on a production-ready Cloud Run environment.
- **HTTP Endpoint:** Implemented a dedicated `/api/health` endpoint to satisfy the "callable via HTTP" requirement.

---

## Opportunities
- **How different is it from any of the other existing ideas?** Most AI tools are generic; this is a specialized workstation. It uses a "Technical Dashboard" aesthetic that prioritizes data density and professional utility over casual conversation.
- **How will it solve the problem?** It reduces reading time by up to 90% by instantly extracting key takeaways and presenting them in a structured, scannable format.
- **USP of the proposed solution:** A professional-grade UI combined with ADK-driven persona tuning, optimized specifically for the "Summarization" task rather than general-purpose chat.

---

## List of features offered by the solution
- **Professional Summarization:** High-quality synthesis using Gemini 3 Flash.
- **Technical Dashboard UI:** A high-density interface with real-time system status indicators.
- **Markdown Rendering:** Structured output with headers and bullet points for readability.
- **Productivity Tools:** One-click "Copy to Clipboard," "Clear Buffer," and "Full-screen Expand" modes.
- **System Health Monitoring:** Built-in health check endpoint (`/api/health`) for deployment monitoring.

---

## Process flow diagram
1. **User Input:** User pastes long-form text into the Input Buffer.
2. **Processing:** React Frontend sends the payload to the Gemini API via ADK.
3. **Synthesis:** Gemini 3 Flash processes the text based on "Professional Summarizer" system instructions.
4. **Delivery:** The agent streams/returns the summary to the UI.
5. **Rendering:** The summary is rendered as Markdown for the user to copy or review.

---

## Technologies to be used in the solution
- **AI/LLM:** Gemini 3 Flash (`@google/genai`)
- **Framework:** ADK (Agent Development Kit)
- **Frontend:** React 19, Tailwind CSS 4.0, Lucide Icons
- **Backend:** Node.js, Express
- **Animations:** Motion (formerly Framer Motion)
- **Deployment:** Google Cloud Run

---

## Snapshots of the prototype
- **Live URL:** [https://gemini-summarizer-agent-517518732704.us-west1.run.app](https://gemini-summarizer-agent-517518732704.us-west1.run.app)
- **Health Check:** [https://gemini-summarizer-agent-517518732704.us-west1.run.app/api/health](https://gemini-summarizer-agent-517518732704.us-west1.run.app/api/health)

### Prototype Interface Overview:
The prototype features a high-density "Technical Dashboard" interface:
- **Dual-Pane Layout**: A clear separation between the input source (left) and the agent's synthesized response (right).
- **Real-Time Metrics**: Displays character count, word count, and the active model (Gemini 3 Flash).
- **Status Indicators**: Real-time feedback on the agent's processing status (e.g., "COMPLETE").
- **Professional Synthesis**: Structured markdown output with "Executive Summary" and "Key Takeaways" sections.
- **Action Controls**: Integrated buttons for "Execute Agent," "Clear Buffer," and "Copy Output."

---

**Thank you!**
*Build in APAC. Build for the world.*
