// src/pages/ChatPage.tsx
import { useState, useEffect, useRef } from 'react';
import { Send, Download, LogOut, Loader, Shield, AlertCircle, MapPin, Clock, HeartHandshake } from 'lucide-react';

export default function ChatPage({ onLogout }: { onLogout: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string; pdfUrl?: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionId = `web-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/${sessionId}`);

    ws.current.onopen = () => {
      console.log('CONNECTED →', sessionId);
      setMessages([{ role: 'agent', content: 'Welcome! How can I help you today?' }]);
    };

    ws.current.onmessage = (e) => {
      const text = e.data.trim();
      if (!text) return;

      const pdfMatch = text.match(/(https?:\/\/[^\s]+\.pdf)/i);
      const pdfUrl = pdfMatch ? pdfMatch[0] : undefined;
      const cleanText = pdfUrl ? text.replace(pdfUrl, '').trim() : text;

      setMessages(prev => [...prev, { role: 'agent', content: cleanText, pdfUrl }]);
      setIsLoading(false);
    };

    ws.current.onclose = () => console.log('DISCONNECTED');
    ws.current.onerror = (e) => console.error('WS ERROR', e);

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const msg = input.trim();
    if (!msg || isLoading || !ws.current) return;

    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);
    ws.current.send(msg);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold">Refugee First</h1>
          </div>
          <button onClick={onLogout} className="text-red-600 hover:bg-red-50 p-3 rounded-xl transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div className="max-w-3xl">

                {/* User Message */}
                {m.role === 'user' && (
                  <div className="bg-blue-600 text-white px-5 py-3 rounded-3xl shadow-md text-base">
                    {m.content}
                  </div>
                )}

                {/* Agent Message */}
                {m.role === 'agent' && (
                  <div className="space-y-5">
                    <div className="bg-white border-2 border-blue-100 rounded-3xl shadow-lg p-5">
                      {m.content.split('\n').map((line, idx) => {
                        const trimmed = line.trim();

                        // Urgent headers: **FIRST 2 HOURS**
                        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                          return (
                            <div key={idx} className="mb-5 -mx-5 -mt-5 px-5 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-3xl flex items-center gap-3">
                              <AlertCircle className="w-6 h-6" />
                              <h2 className="text-lg font-bold">{trimmed.replace(/\*\*/g, '')}</h2>
                            </div>
                          );
                        }

                        // Time sections: **NEXT 12 HOURS – ...**
                        if (trimmed.includes('HOURS') && trimmed.includes('–')) {
                          return (
                            <div key={idx} className="mt-6 mb-4 p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl flex items-center gap-3 shadow-md">
                              <Clock className="w-6 h-6" />
                              <h3 className="text-base font-bold">{trimmed.replace(/\*\*/g, '')}</h3>
                            </div>
                          );
                        }

                        // List items
                        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                          return (
                            <div key={idx} className="flex items-start gap-3 my-3 text-gray-800">
                              <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <p className="text-base leading-relaxed">{trimmed.slice(2)}</p>
                            </div>
                          );
                        }

                        // Regular text
                        if (trimmed) {
                          return <p key={idx} className="text-base text-gray-700 leading-relaxed my-3">{trimmed}</p>;
                        }

                        return <div key={idx} className="h-2" />;
                      })}
                    </div>

                    {/* PDF Button */}
                    {m.pdfUrl && (
                      <a
                        href={m.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white px-7 py-4 rounded-2xl font-semibold text-base shadow-xl hover:from-emerald-700 hover:to-green-800 transition transform hover:scale-105"
                      >
                        <Download className="w-6 h-6" />
                        Download Full Survival Guide (PDF with Maps)
                        <HeartHandshake className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-blue-100 rounded-3xl px-6 py-4 shadow-lg">
                <Loader className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t shadow-2xl p-5">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Ask about shelter, food, medical help..."
            className="flex-1 px-6 py-4 text-base border-2 border-gray-300 rounded-full focus:border-blue-600 outline-none transition"
            disabled={isLoading}
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-semibold text-base hover:from-blue-700 hover:to-green-700 disabled:opacity-50 flex items-center gap-2 shadow-xl transition"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}