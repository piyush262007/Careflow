import React, { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const AIChatWidget: React.FC = () => {
  const messages = [
    'Analyzing patient vitals...',
    'Blood pressure normal ✓',
    'Next dosage scheduled for 2:00 PM',
    'Checking doctor availability...',
    'Generating clinical summary...',
  ];

  const [currentText, setCurrentText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const fullText = messages[msgIndex % messages.length];

    if (isTyping) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 20);
      } else {
        setMsgIndex((prev) => prev + 1);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, msgIndex]);

  return (
    <div className="flow-glass flow-glass-interactive rounded-xl p-3 shadow-apple-lg border border-purple-500/30">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30">
          <Bot className="h-4 w-4" />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[var(--text-primary)]">CareFlow AI</span>
            <Sparkles className="h-3 w-3 text-purple-500 dark:text-purple-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-300 font-mono truncate h-4">
            {currentText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>
    </div>
  );
};
