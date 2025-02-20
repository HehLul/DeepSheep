'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Upload, SendHorizontal } from 'lucide-react';
import Link from 'next/link';
import { themes } from '@/lib/themes';  // Changed from @/config/themes to @/lib/themes
import { ThemeCard } from '@/components/ThemeCard';  // Also make sure this path is correct
import { FeedbackButton } from '@/components/FeedbackButton';

export default function CustomizePage() {
  const router = useRouter();
  const [chatbotConfig, setChatbotConfig] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(themes.classic);
  const [customization, setCustomization] = useState({
    logo: null,
    logoPreview: null,
    heroTitle: '',
    heroSubtitle: '',
    theme: 'classic',
    ...themes.classic.styles
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('chatbotConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setChatbotConfig(config);
        setCustomization(prev => ({
          ...prev,
          heroTitle: `Chat with ${config.name}`,
          heroSubtitle: config.description
        }));
      }
    }
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setCustomization(prev => ({
      ...prev,
      theme: theme.id,
      ...theme.styles
    }));
  };

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
    localStorage.setItem('customization', JSON.stringify(customization));
    router.push('/launch');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/sheep-logo.png" alt="DeepSheep Logo" className="w-8 h-8" />
              <span className="text-lg font-medium">DeepSheep</span>
            </Link>
       
              <FeedbackButton />
            
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="max-w-2xl mx-auto">
            {/* Your existing progress indicator code */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customization Controls */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Customize Your Chatbot</h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Theme Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Choose a Theme
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(themes).map((theme) => (
                        <ThemeCard
                          key={theme.id}
                          theme={theme}
                          isSelected={selectedTheme.id === theme.id}
                          onSelect={handleThemeSelect}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo (Optional)
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
                  style={{ 
                    backgroundColor: selectedTheme.styles.backgroundColor,
                    fontFamily: selectedTheme.styles.fontFamily.body
                  }}
                >
                  {/* Preview Header */}
                  <div 
                    className="p-4 border-b" 
                    style={{ borderColor: selectedTheme.styles.accentColor + '20' }}
                  >
                    {customization.logoPreview && (
                      <img 
                        src={customization.logoPreview} 
                        alt="Website Logo" 
                        className="h-8 object-contain"
                      />
                    )}
                  </div>

                  {/* Preview Hero */}
                  <div className={selectedTheme.styles.spacing.contentPadding + " text-center"}>
                    <h1 
                      className="text-3xl font-bold mb-4"
                      style={{ 
                        color: selectedTheme.styles.accentColor,
                        fontFamily: selectedTheme.styles.fontFamily.heading
                      }}
                    >
                      {customization.heroTitle}
                    </h1>
                    <p className="text-gray-600 mb-8">
                      {customization.heroSubtitle}
                    </p>

                    {/* Chat Interface Preview */}
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border">
                      <div className={`${selectedTheme.styles.spacing.messagePadding} ${selectedTheme.styles.spacing.messageGap}`}>
                        {/* Bot Message */}
                        <div className="flex justify-start">
                          <div 
                            className={`${selectedTheme.styles.messageStyles.botMessage.backgroundColor} 
                              ${selectedTheme.styles.messageStyles.botMessage.rounded} 
                              ${selectedTheme.styles.messageStyles.botMessage.padding} 
                              max-w-[80%]`}
                          >
                            Hello! How can I help you today?
                          </div>
                        </div>

                        {/* User Message */}
                        <div className="flex justify-end">
                          <div 
                            className={`${selectedTheme.styles.messageStyles.userMessage.rounded} 
                              ${selectedTheme.styles.messageStyles.userMessage.padding} 
                              max-w-[80%] text-white`}
                            style={{ backgroundColor: selectedTheme.styles.accentColor }}
                          >
                            Hi! I have a question...
                          </div>
                        </div>
                      </div>

                      {/* Input Area */}
                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className={`flex-1 border ${selectedTheme.styles.inputStyles.rounded} 
                              ${selectedTheme.styles.inputStyles.padding} focus:outline-none focus:ring-2`}
                            style={{ 
                              fontFamily: selectedTheme.styles.fontFamily.body 
                            }}
                            disabled
                          />
                          <button
                            style={{ backgroundColor: selectedTheme.styles.buttonColor }}
                            className={`${selectedTheme.styles.inputStyles.rounded} px-4 py-2 text-white`}
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