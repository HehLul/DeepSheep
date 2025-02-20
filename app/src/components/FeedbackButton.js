// src/components/FeedbackButton.js
"use client";

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export function FeedbackButton() {
  const [showPopup, setShowPopup] = useState(false);

  const handleFeedback = () => {
    // You can replace this URL with your actual feedback form
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSduDSCJ-4EAKcG_BVu1SU6CSC0UQv-tJU3fJQt7Bd6ETh17Lw/viewform?usp=header', '_blank');
  };

  return (
    <button
      onClick={handleFeedback}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <MessageSquare className="w-4 h-4" />
      <span>Feedback</span>
    </button>
  );
}