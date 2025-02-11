'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LaunchPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState(null);
  const [customization, setCustomization] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('chatbotConfig');
      const savedCustomization = localStorage.getItem('customization');
      
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setChatbotConfig(config);
        setSubdomain(config.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
      }
      
      if (savedCustomization) {
        setCustomization(JSON.parse(savedCustomization));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        email,
        subdomain,
        chatbotConfig: JSON.parse(localStorage.getItem('chatbotConfig')),
        customization: JSON.parse(localStorage.getItem('customization'))
      };
      
      const response = await fetch('/api/launch-chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to launch chatbot');
      }
      
      // Store additional info if needed
      localStorage.setItem('userEmail', email);
      localStorage.setItem('chatbotUrl', data.url);
      
      // Set email sent state
      setEmailSent(true);
    } catch (error) {
      console.error('Launch error:', error);
      alert(`Failed to launch chatbot: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
<nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-between h-16 items-center">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img 
          src="/sheep-logo.png" 
          alt="DeepSheep Logo" 
          className="w-8 h-8 text-blue-500"
        />
        <span className="text-lg font-medium">DeepSheep</span>
      </Link>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <span className="text-sm font-medium">Setup AI</span>
            </div>
            <div className="h-px bg-gray-200 w-16"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <span className="text-sm font-medium">Customize</span>
            </div>
            <div className="h-px bg-gray-200 w-16"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm font-medium">Launch</span>
            </div>
          </div>

          {/* Launch Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-8">
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Check Your Email!</h2>
                <p className="text-gray-600">
                  We've sent your chatbot access link to {email}. Click the link in your email to access your chatbot.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Ready to Launch Your AI Chatbot
                  </h1>
                  <p className="text-gray-600">
                    Your chatbot is ready to go live. Enter your email and we'll send you the access link.
                  </p>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Launch Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Me App URL
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Additional Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-3">
                    <LinkIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <strong className="font-medium">What happens next?</strong>
                      <ul className="mt-1 ml-4 list-disc text-blue-800">
                        <li>Check your email for your chatbot access link</li>
                        <li>Click the link to access your chatbot</li>
                        <li>Share your chatbot with your audience</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}