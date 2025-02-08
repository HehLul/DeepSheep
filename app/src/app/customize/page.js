'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Upload, SendHorizontal } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const [chatbotConfig, setChatbotConfig] = useState(null);
  const [customization, setCustomization] = useState({
    logo: null,
    logoPreview: null,
    heroTitle: '',
    heroSubtitle: '',
    backgroundColor: '#ffffff',
    accentColor: '#2563eb', // blue-600
    buttonColor: '#1d4ed8', // blue-700
  });

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Load chatbot configuration
      const savedConfig = localStorage.getItem('chatbotConfig');
    if (savedConfig) {
      setChatbotConfig(JSON.parse(savedConfig));
      // Set initial hero title based on AI name
      const config = JSON.parse(savedConfig);
      setCustomization(prev => ({
        ...prev,
        heroTitle: `Chat with ${config.name}`,
        heroSubtitle: config.description
      }));
    }
    }
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomization(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save customization settings
    localStorage.setItem('customization', JSON.stringify(customization));
    router.push('/launch');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/sheep-logo.png" 
                alt="DeepSheep Logo" 
                className="w-8 h-8"
              />
              <span className="text-lg font-medium">DeepSheep</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                  ✓
                </div>
                <span className="text-sm font-medium">Setup AI</span>
              </div>
              <div className="h-px bg-gray-200 w-16"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  2
                </div>
                <span className="text-sm font-medium">Customize</span>
              </div>
              <div className="h-px bg-gray-200 w-16"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm">
                  3
                </div>
                <span className="text-sm text-gray-400">Launch</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customization Controls */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Customize Your Chatbot</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo
                    </label>
                    <div className="flex items-center gap-4">
                      {customization.logoPreview && (
                        <img 
                          src={customization.logoPreview} 
                          alt="Logo Preview" 
                          className="w-12 h-12 object-contain"
                        />
                      )}
                      <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Upload Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Hero Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={customization.heroTitle}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        heroTitle: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Subtitle
                    </label>
                    <input
                      type="text"
                      value={customization.heroSubtitle}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        heroSubtitle: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={customization.backgroundColor}
                        onChange={(e) => setCustomization(prev => ({
                          ...prev,
                          backgroundColor: e.target.value
                        }))}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        value={customization.accentColor}
                        onChange={(e) => setCustomization(prev => ({
                          ...prev,
                          accentColor: e.target.value,
                          buttonColor: e.target.value
                        }))}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Launch
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Preview</h2>
                <div 
                  className="rounded-lg overflow-hidden shadow-lg"
                  style={{ backgroundColor: customization.backgroundColor }}
                >
                  {/* Preview Header */}
                  <div className="p-4 border-b" style={{ borderColor: customization.accentColor + '20' }}>
                    {customization.logoPreview && (
                      <img 
                        src={customization.logoPreview} 
                        alt="Website Logo" 
                        className="h-8 object-contain"
                      />
                    )}
                  </div>

                  {/* Preview Hero */}
                  <div className="px-8 py-12 text-center">
                    <h1 
                      className="text-3xl font-bold mb-4"
                      style={{ color: customization.accentColor }}
                    >
                      {customization.heroTitle}
                    </h1>
                    <p className="text-gray-600 mb-8">
                      {customization.heroSubtitle}
                    </p>

                    {/* Chat Interface Preview */}
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border">
                      <div className="p-4 space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                            Hello! How can I help you today?
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div 
                            className="rounded-lg px-4 py-2 max-w-[80%] text-white"
                            style={{ backgroundColor: customization.accentColor }}
                          >
                            Hi! I have a question...
                          </div>
                        </div>
                      </div>
                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border rounded-lg"
                            disabled
                          />
                          <button
                            style={{ backgroundColor: customization.buttonColor }}
                            className="px-4 py-2 text-white rounded-lg"
                            disabled
                          >
                            <SendHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}