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

const Button = ({ children, className = "", onClick, size = "default", variant = "default" }) => {
  const sizeClasses = {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    secondary: "bg-white text-blue-600 hover:bg-gray-50 border border-gray-200"
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

const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  const navHeight = 80; // Adjust this value based on your navbar height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                <img 
                  src="/sheep-logo.png" 
                  alt="DeepSheep Logo" 
                  className="w-12 h-12" 
                />
                DeepSheep
              </a>
              <div className="hidden md:flex space-x-8">
                <a 
                  href="#features" 
                  onClick={(e) => scrollToSection(e, 'features')} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => scrollToSection(e, 'how-it-works')} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  How It Works
                </a>
              </div>
              <div className="hidden md:flex space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/setup')}
                >
                  Start Free
                </Button>
              </div>
              <button
                className="md:hidden text-gray-600"
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
                <a href="#features" className="block py-2 text-gray-600 hover:text-blue-600">
                  Features
                </a>
                <a href="#how-it-works" className="block py-2 text-gray-600 hover:text-blue-600">
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Launch Your Money-Making AI Chatbot in 3 Minutes
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Build, customize, and monetize your own AI chatbot without any coding. 
                Perfect for creators, businesses, and entrepreneurs.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/setup')}
              >
                Start Building Free
              </Button>
              <p className="mt-4 text-sm text-gray-500">No credit card required</p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
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
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
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
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            What's Included
          </h2>
          <div className="grid gap-4 text-center md:grid-cols-2">
            {includedFeatures.map((feature, i) => (
              <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-600">
                <CheckCircle className="text-blue-600" size={24} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Coming Soon
          </h2>
          <div className="grid gap-4 text-center md:grid-cols-2">
            {comingSoon.map((feature, i) => (
              <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-500">
                <Rocket className="text-blue-600" size={24} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Launch Your AI Chatbot?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start building your chatbot today with our free tier.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push('/setup')}
            >
              Start Building Free
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-8 border-t border-gray-200">
          <p>&copy; {new Date().getFullYear()} DeepSheep • <a href="#" className="text-blue-600">Privacy</a> • <a href="#" className="text-blue-600">Terms</a></p>
        </footer>
      </div>
    </div>
  );
}