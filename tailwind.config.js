/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    screens: {
      'sm': '280px',
      'md': '720px',
      'lg': '1025px',
      'xl': '2500px',
    },
    fontFamily: {
      'font-family': ['Kantumruy Pro', 'sans-serif'],

    },
    extend: {
      colors: {
        'white': '#f5f5f5',
        'gray': '#b3b3b3',
        'gray-1': 'rgba(123, 130, 154, 0.5)',
        'gray-2': 'rgba(123, 130, 154, 0.7)',
        'gray-3': '#7B829A',
        'gray-4': '#373C4F',
        'purple-2': '#8c71a7',
      }
    },
    borderRadius: {
      'lg': '10px',
      'full': '100%'
    },
    backgroundImage: {
      'list': 'linear-gradient(90deg, rgba(210, 210, 210, 0.10) 10.85%, rgba(217, 217, 217, 0.00) 95.5%)'
    }
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}