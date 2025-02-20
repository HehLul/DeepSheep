'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import {
  MessageSquare,
  Palette,
  Zap,
  Brain,
  BarChart3,
  Rocket,
  CheckCircle
} from "lucide-react";

// Custom Button Component
const Button = ({ children, className = "", onClick, size = "default", variant = "default" }) => {
  const sizeClasses = {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent hover:bg-gray-800",
    secondary: "bg-white text-blue-500 hover:bg-gray-100"
  };

  return (
    <button
      className={`rounded-lg font-semibold transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "No-Code Builder",
      description: "Create a professional AI chatbot in minutes without any technical knowledge.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Easy Customization",
      description: "Brand your chatbot with custom colors, logos, and messaging.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Deployment",
      description: "Get your chatbot up and running instantly with a unique URL.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart AI Training",
      description: "Train your AI with specific instructions and examples for any niche.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Usage Analytics",
      description: "Track conversations, user engagement, and performance metrics.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Free to Start",
      description: "Launch your first chatbot with 50,000 free tokens. Upgrade anytime.",
    },
  ];

  const steps = [
    {
      title: "Train (3 min)",
      description: "Share your expertise and examples to create your perfect AI assistant.",
    },
    {
      title: "Customize (1 min)",
      description: "Brand your chatbot with your colors, logo, and perfect your messaging.",
    },
    {
      title: "Launch (1 min)",
      description: "Get your unique URL and start sharing your AI with the world.",
    },
  ];

  const includedFeatures = [
    'Instant chatbot deployment',
    'Custom branding and design',
    '50,000 free tokens',
    'Train AI with custom instructions',
  ];

  const comingSoon = [
    'User Dashboard',
    'Built-in monetization',
    'Real-time analytics',
    'Multiple chatbots',

  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          
        
      {/* Navigation */}
      <nav className=" bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-500">
            <img 
              src="/sheep-logo.png" 
              alt="DeepSheep Logo" 
              className="w-12 h-12" 
            ></img>
            DeepSheep
          </a>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">
                How It Works
              </a>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
                onClick={() => router.push('/setup')}
              >
                Start Free
              </Button>
            </div>
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? "✕" : "☰"}
            </button>
          </div>
          {/* Mobile menu */}
          {isNavOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pt-4 pb-2"
            >
              <a href="#features" className="block py-2 text-gray-300 hover:text-blue-400">
                Features
              </a>
              <a href="#how-it-works" className="block py-2 text-gray-300 hover:text-blue-400">
                How It Works
              </a>
              <Button 
                className="w-full mt-4"
                onClick={() => router.push('/setup')}
              >
                Start Building Free
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-500">
              Launch Your Money-Making AI Chatbot in 3 Minutes
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build, customize, and monetize your own AI chatbot without any coding. 
              Perfect for creators, businesses, and entrepreneurs.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push('/setup')}
            >
              Start Building Free
            </Button>
            <p className="mt-4 text-sm text-gray-400">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400">
            Everything You Need to Launch Your AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400">
            Three Simple Steps to Launch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">
          What's Included
        </h2>
        <div className="grid gap-4 text-center md:grid-cols-2">
          {includedFeatures.map((feature, i) => (
            <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-300">
              <CheckCircle className="text-blue-400" size={24} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">
          Coming Soon
        </h2>
        <div className="grid gap-4 text-center md:grid-cols-2">
          {comingSoon.map((feature, i) => (
            <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-400">
              <Rocket className="text-blue-400" size={24} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch Your AI Chatbot?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start building your chatbot today with our free tier.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => router.push('/setup')}
            className="bg-white text-blue-500 hover:bg-gray-100"
          >
            Start Building Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-8 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} DeepSheep • <a href="#" className="text-blue-400">Privacy</a> • <a href="#" className="text-blue-400">Terms</a></p>
      </footer>
      </div>
    </div>
    
  );
}