
import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  User,
  Bot,
  Loader2,
  Compass,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: `
# ሰላም (Selam)!

Welcome to **Travel Ethiopia AI Guide**.

I can help you build custom itineraries, discover hidden gems, navigate logistics, and plan unforgettable journeys across Ethiopia.

How can I help you today?
`
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isLoading]);

  const handleSuggestionClick = (text) => {
    if (isLoading) return;
    executeSendMessage(text);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const currentQuery = input.trim();

    if (!currentQuery || isLoading) return;

    setInput('');
    executeSendMessage(currentQuery);
  };

  const executeSendMessage = async (queryText) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: queryText
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5000/api/ai/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userQuery: queryText
          })
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: 'bot',
            text: data.response
          }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'bot',
          text: `### ⚠️ Connection Error

Unable to retrieve travel information right now.

Please ensure your backend server is running and try again.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#111827] text-white overflow-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#E8ECE9] px-6 py-4 shadow-sm">

        <div className="max-w-4xl mx-auto flex items-center gap-4">

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/20">
            <Compass size={22} />
          </div>

          <div>
            <h1 className="font-black tracking-tight text-lg text-gray-900 flex items-center gap-2">
              TRAVEL
              <span className="text-emerald-600 font-semibold">
                ETHIOPIA
              </span>

              <span className="px-2 py-1 text-[10px] rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                AI Guide
              </span>
            </h1>

            <p className="text-xs text-gray-500">
              Your intelligent travel companion
            </p>
          </div>
        </div>
      </header>

     ```jsx
{/* CHAT AREA */}
<main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#111827] to-[#0F172A] px-5 py-8">
  <div className="max-w-4xl mx-auto space-y-6">

    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex ${
          msg.role === "user"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`flex gap-4 max-w-[75%] ${
            msg.role === "user"
              ? "flex-row-reverse"
              : ""
          }`}
        >

          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
              msg.role === "user"
                ? "bg-gradient-to-br from-emerald-600 to-green-700 border-transparent text-white"
                : "bg-[#1F2937] border-gray-700 text-white"
            }`}
          >
            {msg.role === "user"
              ? <User size={18} />
              : <Bot size={18} />}
          </div>

          {/* Bubble */}
          <div>
            <div
              className={`px-5 py-4 rounded-3xl shadow-sm border ${
                msg.role === "user"
                  ? `
                    bg-gradient-to-br
                    from-emerald-600
                    to-green-700
                    border-transparent
                    rounded-tr-md
                  `
                  : `
                    bg-[#1F2937]
                    border-gray-700
                    rounded-tl-md
                  `
              }`}
            >

              {/* Markdown */}
              <div className="text-white text-[15px] leading-7 break-words">

                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-white mb-4">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold text-white mb-3">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-white mb-3 leading-7">
                        {children}
                      </p>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-bold text-white">
                        {children}
                      </strong>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc ml-6 mb-3 text-white">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="list-decimal ml-6 mb-3 text-white">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="mb-1 text-white">
                        {children}
                      </li>
                    ),

                    code: ({ children }) => (
                      <code className="bg-gray-800 px-1.5 py-1 rounded text-emerald-300">
                        {children}
                      </code>
                    )
                  }}
                >
                  {msg.text}
                </ReactMarkdown>

              </div>
            </div>

            <div
              className={`mt-2 text-xs text-gray-400 ${
                msg.role === "user"
                  ? "text-right"
                  : ""
              }`}
            >
              {msg.role === "user"
                ? "You"
                : "Ethiopia Expert"}
            </div>
          </div>

        </div>
      </div>
    ))}

    {/* Loading State */}
    {isLoading && (
      <div className="flex items-center gap-3">

        <div className="bg-[#1F2937] border border-gray-700 rounded-2xl p-3">
          <Loader2
            size={18}
            className="animate-spin text-emerald-500"
          />
        </div>

        <span className="text-sm text-gray-400 animate-pulse">
          Gathering routes and local insights...
        </span>

      </div>
    )}

    <div ref={messagesEndRef} />

  </div>
</main>
```
{/* 3. DARK INTERACTIVE FOOTER */}
      <footer className="p-4 md:p-6 bg-stone-900 border-t border-stone-950 shrink-0 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Dark-Adapted Quick Suggestions Chips */}
          {!isLoading && messages.length === 1 && (
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 pl-1">
                <Sparkles size={12} className="text-emerald-400" /> Suggested Exploration Routes
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Recommend a 7-day Northern Historical Circuit itinerary',
                  'What is the best season to trek the Simien Mountains?',
                  'What are the travel safety tips for visiting Danakil Depression?'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSuggestionClick(item)}
                    className="text-xs text-left px-3 py-2 bg-stone-800/60 hover:bg-emerald-950/80 text-stone-300 hover:text-emerald-300 border border-stone-700/50 hover:border-emerald-800 rounded-xl transition-all font-medium duration-150 shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Action Controls with Dark Mode Inputs */}
          <form onSubmit={handleFormSubmit} className="flex gap-3 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rock-hewn churches, flight transfers, altitude preparation..."
                disabled={isLoading}
                className="w-full text-sm bg-stone-800 text-stone-100 border border-stone-700 rounded-xl pl-4 pr-12 py-4 focus:ring-2 focus:ring-emerald-500 focus:bg-stone-850 focus:border-transparent outline-none transition-all disabled:opacity-50 placeholder:text-stone-500 shadow-inner"
              />
            </div>
            <button
              disabled={isLoading || !input.trim()}
              type="submit"
              className="bg-emerald-600 text-white p-4 rounded-xl hover:bg-emerald-500 disabled:opacity-20 disabled:hover:bg-emerald-600 transition-all flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/40 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Chat;

