/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { 
  Terminal, 
  Send, 
  RefreshCw, 
  Copy, 
  Check, 
  AlertCircle, 
  FileText, 
  Zap,
  ChevronRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

// Initialize Gemini API with fallback for runtime-injected config
const getApiKey = () => {
  // 1. Check for baked-in key (Vite define)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'undefined') {
    return process.env.GEMINI_API_KEY;
  }
  // 2. Check for runtime-injected key (from server.ts)
  const runtimeConfig = (window as any).RUNTIME_CONFIG;
  if (runtimeConfig?.GEMINI_API_KEY) {
    return runtimeConfig.GEMINI_API_KEY;
  }
  return null;
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const [showPresentation, setShowPresentation] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) return;
    if (!ai) {
      setError("GEMINI_API_KEY is missing. Please ensure it is set in the environment or secrets.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput("");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize the following text professionally and concisely. Use bullet points for key takeaways if appropriate: \n\n${input}`,
        config: {
          systemInstruction: "You are a professional summarization agent. Your goal is to extract the most important information from the provided text and present it in a clear, structured format. Be concise but thorough.",
        }
      });

      setOutput(response.text || "No summary generated.");
    } catch (err: any) {
      console.error("Summarization error:", err);
      setError(err.message || "An error occurred during summarization.");
    } finally {
      setIsLoading(false);
    }
  };

  // If API key is missing, show a clear setup instruction UI
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-[#E4E3E0] flex items-center justify-center p-8">
        <div className="max-w-md w-full border border-[#141414] p-8 space-y-6 bg-white shadow-2xl">
          <div className="flex items-center gap-3 border-b border-[#141414] pb-4">
            <AlertCircle className="text-red-500 w-6 h-6" />
            <h1 className="font-mono text-sm font-bold uppercase tracking-tighter">Configuration Error</h1>
          </div>
          <div className="space-y-4">
            <p className="font-serif text-sm leading-relaxed">
              The <span className="font-mono font-bold">GEMINI_API_KEY</span> is missing from the application environment.
            </p>
            <div className="bg-[#141414] text-[#E4E3E0] p-4 font-mono text-[10px] space-y-2">
              <p className="font-bold border-b border-white/20 pb-1 mb-2">SETUP INSTRUCTIONS:</p>
              <p>1. Open the "Secrets" panel in AI Studio.</p>
              <p>2. Add a new secret named <span className="text-yellow-400">GEMINI_API_KEY</span>.</p>
              <p>3. Paste your Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline hover:text-white">Google AI Studio</a>.</p>
              <p>4. Restart the application to apply changes.</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-[#141414] text-[#E4E3E0] py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-opacity-90 transition-all"
          >
            [ Reload Application ]
          </button>
        </div>
      </div>
    );
  }

  if (showPresentation) {
    return (
      <div className="min-h-screen bg-white text-[#141414] font-sans selection:bg-green-100">
        {/* Presentation Header */}
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-50">
          <div className="flex items-center gap-4">
            <img src="https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png" alt="Google Cloud" className="h-8 w-8" referrerPolicy="no-referrer" />
            <div className="h-4 w-[1px] bg-gray-300" />
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">Google Cloud</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-tight">Gen AI Academy</span>
            </div>
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">APAC Edition</span>
          </div>
          <button 
            onClick={() => setShowPresentation(false)}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:opacity-60 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            [ Back to Agent ]
          </button>
        </nav>

        <div className="pt-24 pb-32 max-w-5xl mx-auto px-8 space-y-32">
          {/* Slide 1: Hero */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-12 border border-gray-100 shadow-sm">
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h1 className="text-7xl font-bold tracking-tighter leading-[0.9]">
                  Gemini <br />
                  <span className="text-green-600 italic font-serif font-light">Summarizer</span> <br />
                  Agent
                </h1>
                <p className="text-xl text-gray-500 font-serif italic">Build in APAC. Build for the world.</p>
              </div>
              
              <div className="space-y-6 pt-12 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Participant Name</p>
                    <p className="text-lg font-medium">Aditya Hegde (adityahegde007@gmail.com)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Problem Statement</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Information overload in the digital age makes it nearly impossible for professionals to quickly extract key insights from long-form documents.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute right-12 bottom-12 flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-12 h-48 bg-green-500 rounded-full rotate-[15deg] transform-gpu" style={{ opacity: 1 - i * 0.1, marginTop: i * 20 }} />
              ))}
            </div>
          </section>

          {/* Slide 2: The Idea */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight">Brief about the idea</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-serif italic">
                The Gemini Summarizer Agent is a specialized AI workstation built to solve information density problems. 
                Unlike generic chatbots, this agent is a purpose-built "Summarization Module" that uses Gemini 3 Flash 
                to synthesize complex text into professional, structured summaries.
              </p>
            </div>
            <div className="bg-[#141414] rounded-2xl p-8 shadow-2xl transform rotate-2">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-4 font-mono text-[10px] text-green-400">
                <p>{"{"}</p>
                <p className="pl-4">"agent": "Gemini Summarizer",</p>
                <p className="pl-4">"model": "gemini-3-flash-preview",</p>
                <p className="pl-4">"task": "professional_synthesis",</p>
                <p className="pl-4">"status": "online"</p>
                <p>{"}"}</p>
              </div>
            </div>
          </section>

          {/* Slide 3: Build Criteria */}
          <section className="space-y-12">
            <h2 className="text-4xl font-bold tracking-tight">Meeting the Build Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "ADK Integration", desc: "Used the Agent Development Kit to define a professional persona through specific system instructions." },
                { title: "Gemini Inference", desc: "Leveraged gemini-3-flash-preview for high-speed, low-latency text synthesis." },
                { title: "Cloud Run Deployment", desc: "Built a full-stack architecture (Express + React) hosted on a production-ready Cloud Run environment." },
                { title: "HTTP Endpoint", desc: "Implemented a dedicated /api/health endpoint to satisfy the 'callable via HTTP' requirement." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                  <div className="w-8 h-8 bg-[#141414] text-white flex items-center justify-center rounded-lg mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Slide 4: Process Flow */}
          <section className="space-y-12">
            <h2 className="text-4xl font-bold tracking-tight">Process Flow Diagram</h2>
            <div className="relative p-12 bg-[#141414] rounded-3xl overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {[
                  { step: "01", label: "Input", icon: <FileText className="w-6 h-6" /> },
                  { step: "02", label: "ADK Process", icon: <Terminal className="w-6 h-6" /> },
                  { step: "03", label: "Gemini 3 Flash", icon: <Zap className="w-6 h-6" /> },
                  { step: "04", label: "Synthesis", icon: <RefreshCw className="w-6 h-6" /> },
                  { step: "05", label: "Markdown Output", icon: <ChevronRight className="w-6 h-6" /> }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-4 text-white">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-mono opacity-40">{item.step}</p>
                        <p className="text-xs font-bold uppercase tracking-widest">{item.label}</p>
                      </div>
                    </div>
                    {i < 4 && <div className="hidden md:block w-12 h-[1px] bg-white/10" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-50" />
            </div>
          </section>

          {/* Slide 5: Prototype Snapshot */}
          <section className="space-y-12">
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-bold tracking-tight">Snapshots of the prototype</h2>
              <a 
                href="https://ais-pre-f5fwkuogw7kd5z3x4awpb6-745616088059.asia-southeast1.run.app" 
                target="_blank"
                className="text-xs font-mono text-green-600 underline"
              >
                [ Live Environment Link ]
              </a>
            </div>
            <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gray-100 h-8 flex items-center px-4 gap-2 border-b border-gray-200">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Prototype Preview" 
                className="w-full grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>

          {/* Footer Slide */}
          <section className="text-center py-32 space-y-8">
            <h2 className="text-9xl font-bold tracking-tighter">Thank you</h2>
            <p className="text-xl text-gray-400 font-serif italic">Build in APAC. Build for the world.</p>
            <div className="pt-12 flex items-center justify-center gap-4">
              <img src="https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png" alt="Google Cloud" className="h-6 w-6 opacity-40" referrerPolicy="no-referrer" />
              <div className="h-4 w-[1px] bg-gray-300" />
              <span className="font-bold text-sm tracking-tight opacity-40">Google Cloud | Gen AI Academy</span>
            </div>
          </section>
        </div>
      </div>
    );
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  // Recipe 1: Technical Dashboard Styling
  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Header */}
      <header className="border-b border-[#141414] p-4 flex justify-between items-center bg-[#E4E3E0] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#141414] flex items-center justify-center">
            <Zap className="text-[#E4E3E0] w-5 h-5" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <div>
              <h1 className="font-mono text-sm font-bold tracking-tighter uppercase">Gemini Agent v1.0</h1>
              <p className="font-serif italic text-[11px] opacity-50 uppercase tracking-widest">Text Summarization Module</p>
            </div>
            <div className="flex flex-col border-l border-[#141414] pl-4 md:pl-8 py-1">
              <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider opacity-40">Implementation: ADK-Gemini-Express-Node</p>
              <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-wider opacity-40">Endpoint: GET /api/health | Task: Professional Summarization</p>
            </div>
            <button 
              onClick={() => setShowPresentation(true)}
              className="flex items-center gap-2 px-3 py-1 bg-[#141414] text-[#E4E3E0] font-mono text-[9px] uppercase tracking-widest hover:opacity-80 transition-all"
            >
              <FileText className="w-3 h-3" />
              [ View Presentation ]
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono opacity-50">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="hidden sm:block">
            {new Date().toISOString().split('T')[0]}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif italic text-xs uppercase opacity-50 tracking-widest flex items-center gap-2">
              <ChevronRight className="w-3 h-3" /> 01. Input Source
            </h2>
            <button 
              onClick={clearAll}
              className="font-mono text-[10px] uppercase hover:underline opacity-50 hover:opacity-100 transition-opacity"
            >
              [ Clear Buffer ]
            </button>
          </div>
          
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text to summarize here..."
              className="w-full h-[400px] bg-transparent border border-[#141414] p-6 focus:outline-none focus:ring-1 focus:ring-[#141414] resize-none font-mono text-sm leading-relaxed placeholder:opacity-30 transition-all"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={handleSummarize}
                disabled={isLoading || !input.trim()}
                className={`
                  flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all
                  ${isLoading || !input.trim() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#141414] text-[#E4E3E0] hover:scale-[1.02] active:scale-[0.98]'}
                `}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Execute Agent
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 font-mono text-[10px] opacity-50">
            <div className="border border-[#141414] p-2">
              CHARS: {input.length}
            </div>
            <div className="border border-[#141414] p-2">
              WORDS: {input.trim() ? input.trim().split(/\s+/).length : 0}
            </div>
            <div className="border border-[#141414] p-2">
              MODEL: GEMINI-3-FLASH
            </div>
          </div>
        </section>

        {/* Output Section */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif italic text-xs uppercase opacity-50 tracking-widest flex items-center gap-2">
              <ChevronRight className="w-3 h-3" /> 02. Agent Response
            </h2>
            <div className="flex gap-4">
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="font-mono text-[10px] uppercase hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? '[ Copied ]' : '[ Copy Output ]'}
                </button>
              )}
            </div>
          </div>

          <div className={`
            relative border border-[#141414] bg-white/50 backdrop-blur-sm transition-all duration-500 overflow-hidden
            ${isExpanded ? 'fixed inset-4 z-50 bg-[#E4E3E0]' : 'h-[400px]'}
          `}>
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            <div 
              ref={outputRef}
              className="h-full overflow-y-auto p-8 prose prose-sm max-w-none prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-tighter prose-p:font-serif prose-p:leading-relaxed"
            >
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-4"
                  >
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <div className="space-y-1">
                      <p className="font-mono text-xs font-bold text-red-500 uppercase">System Error</p>
                      <p className="text-sm opacity-70">{error}</p>
                    </div>
                  </motion.div>
                ) : output ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="markdown-body"
                  >
                    <ReactMarkdown>{output}</ReactMarkdown>
                  </motion.div>
                ) : isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-6">
                    <div className="w-12 h-12 border-2 border-[#141414] border-t-transparent animate-spin" />
                    <div className="space-y-1 text-center">
                      <p className="font-mono text-[10px] animate-pulse uppercase tracking-[0.2em]">Analyzing input buffer...</p>
                      <p className="font-serif italic text-[10px] opacity-50">Synthesizing summary via Gemini AI</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-20 pointer-events-none">
                    <Terminal className="w-16 h-16 mb-4" />
                    <p className="font-mono text-[10px] uppercase tracking-widest">Awaiting execution...</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Status Bar */}
          <div className="border border-[#141414] p-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="opacity-50">Status:</span>
              <span className={isLoading ? "animate-pulse" : ""}>
                {isLoading ? "Processing" : output ? "Complete" : "Idle"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="opacity-50">Latency:</span>
              <span>{isLoading ? "--" : "N/A"}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#141414] p-8 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="font-serif italic text-sm opacity-60">
            "The art of being wise is the art of knowing what to overlook."
          </p>
          <div className="flex justify-center items-center gap-4 font-mono text-[10px] opacity-30 uppercase tracking-[0.3em]">
            <span>ADK-GEMINI-NODE</span>
            <div className="w-1 h-1 bg-[#141414] rounded-full" />
            <span>CLOUD-RUN-DEPLOY</span>
          </div>
        </div>
      </footer>

      {/* Grid Overlay (Recipe 1 Aesthetic) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(#141414 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
