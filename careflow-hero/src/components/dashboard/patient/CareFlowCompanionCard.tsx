import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export const CareFlowCompanionCard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Good morning Sarah! I've loaded your visit details with Dr. Sarah Chen at 10:30 AM. Would you like a list of questions to ask during your consultation?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedActions = [
    'How to prep for Dr. Chen?',
    'Check prescription instructions',
    'What is my queue status?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Dr. Chen will review your blood pressure metrics today. Please arrive 10 minutes early for digital queue check-in.";
      if (query.includes('prescription') || query.includes('instructions')) {
        reply = "Lisinopril 10mg is scheduled for 2:00 PM with food. Amoxicillin was already taken at 8:00 AM.";
      } else if (query.includes('queue') || query.includes('status')) {
        reply = "You are currently Position #3 in line. Estimated wait time is approximately 12 minutes.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Bot className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">CareFlow Companion</h3>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
          <Sparkles className="h-3 w-3" />
          <span>Healthcare Assistant</span>
        </div>
      </div>

      {/* Friendly AI Chat Snippet */}
      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar text-xs">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-[10px] mt-0.5 shadow-sm">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-[var(--bg-card-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-white/20 text-[var(--text-primary)] flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-500" />
            <span>CareFlow Companion is thinking...</span>
          </div>
        )}
      </div>

      {/* Suggested Actions Chips */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Suggested Actions</span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedActions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(act)}
              className="text-[10.5px] font-medium px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-[var(--text-secondary)] hover:border-purple-500/40 hover:text-purple-600 transition-all cursor-pointer"
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Input Prompt Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask your CareFlow Companion..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 py-2 px-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card-bg)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </motion.div>
  );
};
