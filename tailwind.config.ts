import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#f5f5fd',
          100: '#eeecfb',
          200: '#dfdcf8',
          300: '#c7c0f2',
          400: '#ab9ce9',
          500: '#8c74de',
          600: '#7a56d1',
          700: '#6a43be',
          800: '#5f3caa',
          900: '#4a3082',
          950: '#2e1d58',
        },
        secondary: {
          50: '#fff1f3',
          100: '#ffe3e6',
          200: '#ffccd5',
          300: '#ff8ca0',
          400: '#fe6e8a',
          500: '#f83b65',
          600: '#e51950',
          700: '#c20e43',
          800: '#a20f3f',
          900: '#8b103c',
          950: '#4e031c',
        },
        alabaster: {
          50: '#f9fafc',
          100: '#eaedf4',
          200: '#d0d9e7',
          300: '#a7b9d2',
          400: '#7893b8',
          500: '#5776a0',
          600: '#445e85',
          700: '#384c6c',
          800: '#31415b',
          900: '#2d384d',
          950: '#1e2533',
        },
        white: {
          50: '#ffffff',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
          950: '#292929',
        },
        black: {
           50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#000000',
        }
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Courier', 'monospace'],
      },
    },
  },
  plugins: [ require("flowbite/plugin")],
}
export default config

// screens: {
//   'sm': '640px',
//   // => @media (min-width: 640px) { ... }

//   'md': '768px',
//   // => @media (min-width: 768px) { ... }

//   'lg': '1024px',
//   // => @media (min-width: 1024px) { ... }

//   'xl': '1280px',
//   // => @media (min-width: 1280px) { ... }

//   '2xl': '1536px',
//   // => @media (min-width: 1536px) { ... }
// }