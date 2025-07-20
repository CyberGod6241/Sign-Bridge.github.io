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