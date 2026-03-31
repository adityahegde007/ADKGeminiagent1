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

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSummarize = async () => {
    if (!input.trim()) return;

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
