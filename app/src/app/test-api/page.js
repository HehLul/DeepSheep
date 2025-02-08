'use client';

// app/test-api/page.js
import React, { useState, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function TestAPIPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Load the chatbot configuration from localStorage
    const savedConfig = localStorage.getItem('chatbotConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const createSystemMessage = () => {
    if (!config) return 'You are a helpful AI assistant.';
    
    let systemPrompt = `You are ${config.name}. ${config.description}\n\n`;
    systemPrompt += `Main Instructions: ${config.mainPrompt}\n\n`;
    
    if (config.examples.length > 0) {
      systemPrompt += 'Example Interactions:\n';
      config.examples.forEach((example, index) => {
        if (example.trim()) {
          systemPrompt += `${index + 1}. ${example}\n`;
        }
      });
    }
    
    return systemPrompt;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: createSystemMessage()
            },
            ...messages,
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
                <div className="flex items-center gap-2">
                <img 
                    src="/sheep-logo.svg" 
                    alt="DeepSheep Logo" 
                    className="w-8 h-8 text-blue-500"
                />
                <span className="text-lg font-medium">DeepSheep</span>
                </div>
            </div>
            </div>
        </nav>

        {/* Chat Interface */}
        <main className="pt-24 pb-16 px-4">
            <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 min-h-[600px] flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                    Send a message to test the API
                    </div>
                ) : (
                    messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                        >
                        {message.content}
                        </div>
                    </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                        Thinking...
                    </div>
                    </div>
                )}
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="border-t p-4">
                <div className="flex gap-2">
                    <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <SendHorizontal className="w-5 h-5" />
                    </button>
                </div>
                </form>
            </div>
            </div>
        </main>
        </div>
    );
    }