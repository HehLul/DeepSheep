'use client';

// app/setup/page.js
import React, { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mainPrompt: '',
    examples: ['']
  });

  const handleExampleChange = (index, value) => {
    const newExamples = [...formData.examples];
    newExamples[index] = value;
    setFormData({ ...formData, examples: newExamples });
  };

  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, '']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the form data in localStorage for the test page to access
    localStorage.setItem('chatbotConfig', JSON.stringify(formData));
    router.push('/customize');
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
                className="w-8 h-8 text-blue-500"
              />
              <span className="text-lg font-medium">DeepSheep</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                1
              </div>
              <span className="text-sm font-medium">Setup AI</span>
            </div>
            <div className="h-px bg-gray-200 w-16"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm text-gray-400">Customize</span>
            </div>
            <div className="h-px bg-gray-200 w-16"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm text-gray-400">Launch</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900">AI Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Marketing Expert AI"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., An AI assistant that helps with marketing strategy"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* AI Configuration */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900">Configure AI Behavior</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Instructions
                </label>
                <textarea
                  value={formData.mainPrompt}
                  onChange={(e) => setFormData({ ...formData, mainPrompt: e.target.value })}
                  placeholder="Describe how your AI should behave and what it should do..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Example Messages */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Example Interactions
                </label>
                {formData.examples.map((example, index) => (
                  <textarea
                    key={index}
                    value={example}
                    onChange={(e) => handleExampleChange(index, e.target.value)}
                    placeholder="Add an example conversation..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
                <button
                  type="button"
                  onClick={addExample}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add another example
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <strong className="font-medium">Tips for better results:</strong>
                <ul className="mt-1 ml-4 list-disc text-blue-800">
                  <li>Be specific about the AI's role and expertise</li>
                  <li>Include both positive and negative examples</li>
                  <li>Add example conversations in different scenarios</li>
                </ul>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors gap-2"
              >
                Continue to Customization
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}