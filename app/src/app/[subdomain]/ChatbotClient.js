// src/app/[subdomain]/ChatbotClient.js
"use client";
import React, { useState } from "react";
import { SendHorizontal, Settings, Home, Users, MessageSquare, Plus } from "lucide-react";

export default function ChatbotClient({ initialConfig, subdomain }) {
  const [config, setConfig] = useState(initialConfig);
  const [customization, setCustomization] = useState(initialConfig.customization);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenUsage, setTokenUsage] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);
    setError(null);
    
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: config?.main_prompt || "You are a helpful AI assistant.",
            },
            ...messages,
            { role: "user", content: userMessage },
          ],
          subdomain: subdomain,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to get response");
      }
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      
      if (data.usage) {
        setTokenUsage(data.usage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Slim Left Navbar */}
      <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-8">
        <div className="flex flex-col items-center space-y-8">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Home className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Users className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="mt-auto">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: customization.backgroundColor }}>
        {/* Token Usage Alert */}
        {tokenUsage && tokenUsage.remaining < 5000 && (
          <div className="bg-blue-50 px-4 py-2 text-sm text-blue-700">
            {tokenUsage.remaining <= 0
              ? "Token limit reached. Please upgrade to continue."
              : `${tokenUsage.remaining.toLocaleString()} tokens remaining.`}
            {tokenUsage.isDevelopment && " (Development mode)"}
          </div>
        )}

        {/* Logo Section */}
        {customization.logoPreview && (
          <div className="p-4">
            <img
              src={customization.logoPreview}
              alt="Logo"
              className="h-8 object-contain"
            />
          </div>
        )}

        {/* Hero Section */}
        <div className="px-8 py-16 text-center">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: customization.accentColor }}
          >
            {customization.heroTitle}
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {customization.heroSubtitle}
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-8">
          <div className="flex-1 bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-full p-6 space-y-4 overflow-y-auto min-h-[400px] max-h-[600px]">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  Send a message to start the conversation
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-3 ${
                        message.role === "user"
                          ? "text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                      style={
                        message.role === "user"
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
                  <div className="bg-gray-100 rounded-2xl px-6 py-3 text-gray-500">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  tokenUsage?.remaining <= 0
                    ? "Token limit reached"
                    : "Type a message..."
                }
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || tokenUsage?.remaining <= 0}
              />
              <button
                type="submit"
                disabled={isLoading || tokenUsage?.remaining <= 0}
                className="px-6 py-3 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: customization.buttonColor }}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="py-4 text-center">
          <a 
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            made by DeepSheep
          </a>
        </div>
      </div>
    </div>
  );
}