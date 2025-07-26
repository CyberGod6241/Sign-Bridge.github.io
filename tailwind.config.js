/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            primary: '#3b82f6',
            secondary: '#1d4ed8',
            accent: '#10b981'
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Poppins', 'sans-serif']
        }
    }
};
export const plugins = [];

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path is correct
//   ],
//   darkMode: 'class', // <-- This is the most important line!
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }