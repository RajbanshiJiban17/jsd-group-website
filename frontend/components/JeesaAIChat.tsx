'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, X, Send, Sparkles, Copy, Check, RefreshCw,
  Trash2, Maximize2, Minimize2, Bot, User, ArrowRight
} from 'lucide-react';
import { api } from '@/lib/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  timestamp: string;
}

const QUICK_ACTIONS = [
  "JSD Group बारेमा जान्नुहोस्",
  "Services हेर्नुहोस्",
  "Projects हेर्नुहोस्",
  "Courses हेर्नुहोस्",
  "Contact गर्नुहोस्",
  "AI/Tech बारे सोध्नुहोस्"
];

export default function JeesaAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session and default greeting
  useEffect(() => {
    let sId = sessionStorage.getItem('jeesa_session_id');
    if (!sId) {
      sId = 'sess_' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('jeesa_session_id', sId);
    }
    setSessionId(sId);

    // Initial default greeting
    setMessages([
      {
        id: 'greet-1',
        sender: 'assistant',
        text: "नमस्ते! म Jeesa AI, JSD Group को AI Assistant हुँ। तपाईंलाई के help चाहिएको छ?",
        sources: ["Verified Knowledge Base"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.sendAIChat(text, sessionId);
      const assistantMsg: ChatMessage = {
        id: 'resp-' + Date.now(),
        sender: 'assistant',
        text: response.answer,
        sources: response.sources_used,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: "मसँग यसबारे verified जानकारी छैन। तपाईं चाहनुहुन्छ भने JSD Group को team सँग directly contact गर्न सक्नुहुन्छ।",
        sources: ["Guardrail"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'greet-new',
        sender: 'assistant',
        text: "नमस्ते! म Jeesa AI, JSD Group को AI Assistant हुँ। तपाईंलाई के help चाहिएको छ?",
        sources: ["Verified Knowledge Base"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all group"
          aria-label="Open Jeesa AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
          </div>
          <span>Jeesa AI</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-white/20 rounded">
            Online
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col shadow-2xl ${
            isFullScreen
              ? 'inset-0 w-full h-full rounded-none bg-slate-950'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh] rounded-2xl glass-panel border border-cyan-500/20'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/80 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Jeesa AI Assistant</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">JSD Group&apos;s intelligent assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm relative group ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Sources tag if assistant */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-cyan-400/80">
                      <span>Sources:</span>
                      {msg.sources.map((src, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 mt-1.5 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-white"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5 text-slate-400 text-xs py-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 bg-slate-900 px-3 py-2 rounded-2xl border border-slate-800">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="ml-1 text-[11px] text-slate-400">Jeesa सोचिरहेको छ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 border-t border-slate-800/60 bg-slate-950/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(action)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors shrink-0"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/90 rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="नेपाली वा English मा सोध्नुहोस्..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white disabled:opacity-50 hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
