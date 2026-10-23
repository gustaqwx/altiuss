export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090d16', night: '#12121F', accent: '#A99BFF', signal: '#6F5FE8',
        snow: '#E8EEF2', mute: '#8FA3B3',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Trebuchet MS', 'sans-serif'],
        body: ['Space Grotesk', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
