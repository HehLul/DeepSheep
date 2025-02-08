'use client';


import { CheckCircle, Rocket, Settings, DollarSign, MessageCircle, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = ({ children, className }) => (
  <button className={`px-6 py-3 rounded-lg font-semibold transition ${className}`}>
    {children}
  </button>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center text-center px-6 py-20">
        <h1 className="text-4xl font-bold text-blue-500 md:text-5xl">
          Launch Your Money-Making AI Chatbot in 3 Minutes
        </h1>
        <p className="mt-4 text-lg text-gray-300 md:text-xl">
          No coding required. Get started free, scale when you succeed.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600">
          Start Building Free
        </Button>
        <p className="mt-2 text-sm text-gray-400">No credit card required</p>
      </header>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {[
            { icon: <Rocket size={36} />, title: 'Train (3 min)', desc: 'Share your expertise and examples' },
            { icon: <Settings size={36} />, title: 'Customize (1 min)', desc: 'Brand your chatbot and set pricing' },
            { icon: <DollarSign size={36} />, title: 'Launch (1 min)', desc: 'Get your unique link and start earning' },
          ].map((step, i) => (
            <motion.div key={i} className="p-6 rounded-xl bg-gray-800" whileHover={{ scale: 1.05 }}>
              <div className="mb-4 text-blue-400">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-400 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">What's Included</h2>
        <div className="grid gap-4 text-center md:grid-cols-2">
          {[
            'Instant chatbot deployment',
            'Custom branding',
            'Built-in payment processing',
            '1,000 free messages',
            'Basic analytics',
          ].map((feature, i) => (
            <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-300">
              <CheckCircle className="text-blue-400" size={24} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-8">Coming Soon</h2>
        <div className="grid gap-4 text-center md:grid-cols-2">
          {[
            'Multiple chatbots',
            'Advanced analytics',
            'Team access',
            'Custom domain support',
          ].map((feature, i) => (
            <div key={i} className="flex items-center justify-center space-x-3 text-lg text-gray-400">
              <BarChart className="text-blue-400" size={24} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center py-12">
        <Button className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600">Start Building Free</Button>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-700">
        &copy; 2024 Easy Chatbot • <a href="#" className="text-blue-400">Privacy</a> • <a href="#" className="text-blue-400">Terms</a>
      </footer>
    </div>
  );
}
