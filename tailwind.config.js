/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/{app,components}/**/*.{js,jsx,ts,tsx}',
    './src/features/**/{components,layout}/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      variables: {
        'header-height': '54px',
      },
      colors: {
        black: {
          0: '#000',
          25: '#0d1117',
          35: '#0f0f0f',
          50: '#161b22',
          75: '#17151575',
        },
        gray: {
          opacity: {
            25: '#DEDEDE25',
            50: '#DEDEDE50',
            75: '#DEDEDE75',
          },
          backdrop: '#1b1a1a50',
        },
        white: '#fff',
        'white-liked': {
          15: '#ffffff15',
          25: '#ffffff25',
          50: '#ffffff50',
          75: '#FFFFFF95',
        },
        corn: '#fbec5d',
      },
      margin: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
      },
      padding: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
      },
    },
  },
  plugins: [],
};
