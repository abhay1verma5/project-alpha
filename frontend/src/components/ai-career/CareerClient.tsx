'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, RotateCcw, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { tr } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STARTER_PROMPTS_EN = [
  'Which govt job is best for a B.Tech graduate?',
  'I am 10th pass, which exams can I apply for?',
  'Best strategy to prepare for SSC CGL?',
  'Banking vs SSC — which career is better?',
];

const STARTER_PROMPTS_HI = [
  'B.Tech के बाद कौन सी सरकारी नौकरी सबसे अच्छी है?',
  'मैं 10वीं पास हूँ, कौन सी परीक्षा दे सकता हूँ?',
  'SSC CGL की तैयारी कैसे करें?',
  'बैंकिंग या SSC — कौन सा करियर बेहतर है?',
];

const MAX_MESSAGES = 10;

export function CareerClient() {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const limitReached = userMessageCount >= MAX_MESSAGES;

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || limitReached) return;
    setError('');

    const newMessages: Message[] = [...messages, { role: 'user', text: text.trim() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessages([...newMessages, { role: 'model', text: data.reply }]);
      }
    } catch {
      setError(tr('common.error', lang));
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const newChat = () => {
    setMessages([]);
    setInput('');
    setError('');
  };

  const starters = lang === 'hi' ? STARTER_PROMPTS_HI : STARTER_PROMPTS_EN;

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ minHeight: 'calc(100vh - 280px)' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircle className="w-4 h-4" />
          <span>{MAX_MESSAGES - userMessageCount} {tr('career.messagesLeft', lang)}</span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={newChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {tr('career.newChat', lang)}
          </button>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 space-y-4 mb-4 min-h-[200px]">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {lang === 'hi' ? 'नमस्ते! मैं आपका करियर सलाहकार हूँ' : 'Hi! I\'m your career advisor'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {lang === 'hi' ? 'सरकारी नौकरी के बारे में कुछ भी पूछें — हिंदी या अंग्रेजी में' : 'Ask me anything about government careers — in Hindi or English'}
            </p>

            {/* Starter prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-400 active:scale-[0.98] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3',
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md'
                  : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md'
              )}
            >
              {msg.role === 'model' ? (
                <div className="text-sm leading-relaxed whitespace-pre-wrap prose-sm">
                  {msg.text.split('\n').map((line, j) => {
                    if (line.startsWith('- ') || line.startsWith('• ')) {
                      return <p key={j} className="ml-2">{line}</p>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={j} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
                    }
                    return <p key={j}>{line || '\u00A0'}</p>;
                  })}
                </div>
              ) : (
                <p className="text-sm">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                {tr('career.thinking', lang)}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-sm text-red-500 font-semibold">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {limitReached ? (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{tr('career.limitReached', lang)}</p>
          <button
            onClick={newChat}
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm active:scale-95 transition-all"
          >
            {tr('career.newChat', lang)}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 sticky bottom-20 md:bottom-4 bg-[var(--background)] py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr('career.placeholder', lang)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-50 active:scale-95 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      )}
    </div>
  );
}
