module.exports = {
  important: true,
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        'black': 'var(--color-black)',
        'white': 'var(--color-white)',
        'gray-100': 'var(--color-gray-100)',
        'gray-400': 'var(--color-gray-400)',
        'gray-600': 'var(--color-gray-600)',
      },
      screens: {
        'sm': '481px',
        'md': '769px',
        'lg': '1025px',
        'xl': '1281px',
      },
      maxWidth: {
        '40': '40px',
        '60': '60px',
        '100': '100px',
        '120': '120px',
        '150': '150px',
        '240': '240px',
        '320': '320px',
        '360': '360px',
      },
      maxHeight: {
        '40': '40px',
        '60': '60px',
        '100': '100px',
        '120': '120px',
        '150': '150px',
        '240': '240px',
        '320': '320px',
        '360': '360px',
      },
    },
  },
  plugins: [],
}