'use client';

import React, { useEffect, useState } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function ChatbotPage({ params }) {
  const [config, setConfig] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('chatbotConfig');
      const savedCustomization = localStorage.getItem('customization');
      
      if (savedConfig) setConfig(JSON.parse(savedConfig));
      if (savedCustomization) setCustomization(JSON.parse(savedCustomization));
    }
  }, []);

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
              content: config?.mainPrompt || 'You are a helpful AI assistant.'
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
        throw new Error('Failed to get response');
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
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!customization) return null;

  return (
    <div style={{ backgroundColor: customization.backgroundColor }} className="min-h-screen">
      {/* Header */}
      <header className="p-4 border-b" style={{ borderColor: customization.accentColor + '20' }}>
        {customization.logoPreview && (
          <img 
            src={customization.logoPreview} 
            alt="Logo" 
            className="h-8 object-contain"
          />
        )}
      </header>

      {/* Hero Section */}
      <div className="px-4 py-12 text-center">
        <h1 
          className="text-3xl font-bold mb-4"
          style={{ color: customization.accentColor }}
        >
          {customization.heroTitle}
        </h1>
        <p className="text-gray-600 mb-8">
          {customization.heroSubtitle}
        </p>

        {/* Chat Interface */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border">
          <div className="p-4 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Send a message to start the conversation
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
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                    style={
                      message.role === 'user' 
                        ? { backgroundColor: customization.accentColor }
                        : {}
                    }
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
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: customization.buttonColor }}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}