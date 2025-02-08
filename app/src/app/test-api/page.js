'use client';

// app/test-api/page.js
import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function TestAPIPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      console.log('Sending request to DeepSeek API...');
      const payload = {
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        model: 'deepseek-chat',
        max_tokens: 1000
      };
      
      console.log('Request payload:', payload);

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-fa14fecc81af4c638e1562facecf3f31'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${data.error?.message || 'Unknown error'}`);
      }
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        }]);
      } else {
        throw new Error('Invalid response format: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('Detailed error:', error);
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