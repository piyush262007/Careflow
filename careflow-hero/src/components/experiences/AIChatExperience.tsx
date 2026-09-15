import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, User } from 'lucide-react';

export const AIChatExperience: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello John! I reviewed your recent blood pressure trends. Everything looks optimal at 118/78 mmHg.' },
    { id: 2, sender: 'user', text: 'Can you check my upcoming appointment with Dr. Chen?' },
    { id: 3, sender: 'ai', text: 'Your follow-up is confirmed for today at 9:30 AM in Cardiology Suite 4B. Would you like me to prepare your medical summary?' },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');

  const promptChips = [
    'Prepare Doctor Summary',
    'Refill Metformin',
    'Analyze Vitals History',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');

    // AI response simulation
    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Processing request for "${text}"... CareFlow AI generated a clinical summary for Dr. Sarah Chen ✓`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 my-24">
      {/* Interactive Chat Demo Side (Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full order-2 lg:order-1"
      >
        <div className="relative w-full rounded-2xl border border-purple-500/30 bg-[var(--bg-surface)] p-5 backdrop-blur-2xl shadow-apple-lg shadow-purple-500/10">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-500 border border-purple-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">CareFlow AI Assistant</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-500">
              <Sparkles className="h-3 w-3 animate-pulse" /> AI Active
            </span>
          </div>

          {/* Chat Messages Window */}
          <div className="space-y-3 min-h-[220px] max-h-[260px] overflow-y-auto pr-1 mb-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-500 shrink-0 mt-0.5">
                      <Bot className="h-3 w-3" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-xs max-w-[80%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-[var(--bg-card-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === 'user' && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20 text-blue-500 shrink-0 mt-0.5">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {promptChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10.5px] font-medium text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] px-3 py-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask CareFlow AI anything..."
              className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Narrative Side (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center order-1 lg:order-2"
      >
        <span className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-purple-500" />
          EXPERIENCE 02 · AI ASSISTANT
        </span>
        <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight mb-4">
          Predictive Care & AI Assistance
        </h3>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
          Conversational health intelligence, instant symptom analysis, and automated clinical summaries generated before your consultation starts.
        </p>
      </motion.div>
    </div>
  );
};
