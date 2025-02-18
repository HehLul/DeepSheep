// src/components/ThemeCard.js
import { Check } from 'lucide-react';

export function ThemeCard({ theme, isSelected, onSelect }) {
  const { name, description, styles } = theme;
  
  const handleClick = (e) => {
    // Prevent form submission
    e.preventDefault();
    onSelect(theme);
  };
  
  return (
    <div
      onClick={handleClick}
      className={`w-full p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Theme Preview */}
      <div 
        className="h-32 rounded-md mb-4 overflow-hidden"
        style={{ backgroundColor: styles.backgroundColor }}
      >
        <div className="h-full p-4 flex flex-col">
          {/* Sample Chat Messages */}
          <div className={`flex justify-start mb-2`}>
            <div 
              className={`${styles.messageStyles.botMessage.backgroundColor} 
                ${styles.messageStyles.botMessage.rounded} 
                ${styles.messageStyles.botMessage.padding} 
                ${styles.fontFamily.body}
                text-sm`}
            >
              Hello! How can I help?
            </div>
          </div>
          <div className={`flex justify-end`}>
            <div 
              className={`${styles.messageStyles.userMessage.rounded} 
                ${styles.messageStyles.userMessage.padding} 
                ${styles.fontFamily.body}
                text-sm text-white`}
              style={{ backgroundColor: styles.accentColor }}
            >
              Hi there!
            </div>
          </div>
        </div>
      </div>
      
      {/* Theme Info */}
      <div className="flex items-start justify-between">
        <div className="text-left">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}