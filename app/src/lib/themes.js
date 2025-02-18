// src/lib/themes.js

export const themes = {
    classic: {
      id: 'classic',
      name: 'Classic',
      description: 'Professional and clean design',
      styles: {
        backgroundColor: '#ffffff',
        accentColor: '#2563eb',
        buttonColor: '#1d4ed8',
        fontFamily: {
          heading: 'font-geist',
          body: 'font-geist'
        },
        messageStyles: {
          userMessage: {
            rounded: 'rounded-lg',
            padding: 'px-4 py-2'
          },
          botMessage: {
            rounded: 'rounded-lg',
            padding: 'px-4 py-2',
            backgroundColor: 'bg-gray-100'
          }
        },
        inputStyles: {
          rounded: 'rounded-lg',
          padding: 'px-3 py-2'
        },
        spacing: {
          contentPadding: 'px-4 py-12',
          messagePadding: 'p-4',
          messageGap: 'space-y-4'
        }
      }
    },
    
    modern: {
      id: 'modern',
      name: 'Modern',
      description: 'Sleek and minimalist interface',
      styles: {
        backgroundColor: '#fafafa',
        accentColor: '#18181b',
        buttonColor: '#18181b',
        fontFamily: {
          heading: 'font-plus-jakarta',
          body: 'font-plus-jakarta'
        },
        messageStyles: {
          userMessage: {
            rounded: 'rounded-2xl',
            padding: 'px-6 py-3'
          },
          botMessage: {
            rounded: 'rounded-2xl',
            padding: 'px-6 py-3',
            backgroundColor: 'bg-gray-50'
          }
        },
        inputStyles: {
          rounded: 'rounded-xl',
          padding: 'px-4 py-3'
        },
        spacing: {
          contentPadding: 'px-8 py-16',
          messagePadding: 'p-6',
          messageGap: 'space-y-6'
        }
      }
    },
    
    playful: {
      id: 'playful',
      name: 'Playful',
      description: 'Friendly and engaging design',
      styles: {
        backgroundColor: '#fdf7ff',
        accentColor: '#9333ea',
        buttonColor: '#7e22ce',
        fontFamily: {
          heading: 'font-quicksand',
          body: 'font-quicksand'
        },
        messageStyles: {
          userMessage: {
            rounded: 'rounded-3xl',
            padding: 'px-6 py-4'
          },
          botMessage: {
            rounded: 'rounded-3xl',
            padding: 'px-6 py-4',
            backgroundColor: 'bg-purple-50'
          }
        },
        inputStyles: {
          rounded: 'rounded-full',
          padding: 'px-6 py-4'
        },
        spacing: {
          contentPadding: 'px-6 py-12',
          messagePadding: 'p-6',
          messageGap: 'space-y-6'
        }
      }
    },
    
    formal: {
      id: 'formal',
      name: 'Formal',
      description: 'Professional enterprise look',
      styles: {
        backgroundColor: '#f8fafc',
        accentColor: '#0f172a',
        buttonColor: '#0f172a',
        fontFamily: {
          heading: 'font-dm-serif',
          body: 'font-dm-sans'
        },
        messageStyles: {
          userMessage: {
            rounded: 'rounded-md',
            padding: 'px-4 py-3'
          },
          botMessage: {
            rounded: 'rounded-md',
            padding: 'px-4 py-3',
            backgroundColor: 'bg-slate-50'
          }
        },
        inputStyles: {
          rounded: 'rounded-md',
          padding: 'px-4 py-3'
        },
        spacing: {
          contentPadding: 'px-8 py-16',
          messagePadding: 'p-6',
          messageGap: 'space-y-4'
        }
      }
    }
  };