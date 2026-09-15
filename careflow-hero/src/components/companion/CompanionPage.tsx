import React, { useState } from 'react';
import { SidebarNav } from '../dashboard/patient/SidebarNav';
import { MobileNav } from '../dashboard/patient/MobileNav';
import { CareFlowAISection } from '../CareFlowAISection';
import { useAuth } from '../../context/AuthContext';
import { Bot, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CompanionPage: React.FC = () => {
  const { setIsAuthOpen, logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('companion');
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! I'm your CareFlow Clinical AI Companion. How can I support your health journey today?`,
      time: 'Just now',
    },
  ]);

  const handleTabChange = (tab: string) => {
    if (tab === 'today') {
      navigate('/today-care');
    } else if (tab === 'hospitals') {
      navigate('/hospitals');
    } else {
      setActiveTab(tab);
    }
  };

  const handleExit = () => {
    setIsAuthOpen(false);
    logout();
    navigate('/login');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserQuery('');

    // Simulate AI clinical response
    setTimeout(() => {
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `I've analyzed your query regarding "${userMsg.text}". Your vital metrics remain within healthy target thresholds. I have logged this observation in your patient health summary for Dr. Sarah Chen.`,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col lg:flex-row theme-transition">
      {/* Desktop Left Navigation Sidebar */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onExit={handleExit}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-24 lg:pb-8">
        {/* Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600">
              <Bot className="h-5 w-5" />
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight text-[var(--text-primary)]">
              CareFlow Companion
            </span>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Proactive Clinical Assistant</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
                CareFlow Health Companion
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Your 24/7 intelligent healthcare companion for medication guidance, lab insights, and doctor updates.
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] shadow-sm shrink-0">
              <span className="font-bold text-[var(--text-primary)]">AI Active</span>
              <span className="text-[10.5px] text-emerald-500 block font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                HIPAA Compliant
              </span>
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] p-5 shadow-lg space-y-4 min-h-[480px] flex flex-col justify-between">
            {/* Messages Thread */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-[var(--bg-card-bg)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9.5px] block mt-1 ${
                        m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="relative pt-2 border-t border-[var(--border-subtle)]">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask CareFlow Companion about your health, lab results, or appointments..."
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-[var(--bg-card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-3.5 p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white cursor-pointer shadow-md transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* AI Features Overview Section */}
          <div className="pt-4">
            <CareFlowAISection />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
};
