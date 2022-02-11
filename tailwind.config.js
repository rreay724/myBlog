module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          lightGray: '#AAAAAA',
          extraLight: '#707070',
          medium: '#212121',
          light: '#3D3D3D',
          default: '#181818',
          fontLight: '#b3b3b3',
          black: '#000000',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
