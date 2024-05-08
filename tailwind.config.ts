import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                md: '440px',
                mdd: '750px',
                lg: '1200px',
                // '3xl': '2000px',
                // ...defaultTheme.screens,
            },
            borderRadius: {
                primary_radius: '30px',
            },
            colors: {
                primary_yellow: '#4581ee',
                secondary_yellow: '#fffcf4',
                secondary_yellow2: '#ffe8a5',

                primary_blue: '#002c54',
                primary_white: '#fff',
                primary_grey: '#ffffffc9',

                primary2: '#00aa63',
                primary2_opacity: '#a9ddc7',
                primary2_hover: '#00814b',

                text_default: '#bcbcbc',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'main-bg': "url('/images/bg.jpg')",
                bl1img: "url('/images/bl1img.jpg')",
            },
            keyframes: {
                linspin: {
                    '100%': { transform: 'rotate(360deg)' },
                },
                easespin: {
                    '12.5%': { transform: 'rotate(135deg)' },
                    '25%': { transform: 'rotate(270deg)' },
                    '37.5%': { transform: 'rotate(405deg)' },
                    '50%': { transform: 'rotate(540deg)' },
                    '62.5%': { transform: 'rotate(675deg)' },
                    '75%': { transform: 'rotate(810deg)' },
                    '87.5%': { transform: 'rotate(945deg)' },
                    '100%': { transform: 'rotate(1080deg)' },
                },
                'left-spin': {
                    '0%': { transform: 'rotate(130deg)' },
                    '50%': { transform: 'rotate(-5deg)' },
                    '100%': { transform: 'rotate(130deg)' },
                },
                'right-spin': {
                    '0%': { transform: 'rotate(-130deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                    '100%': { transform: 'rotate(-130deg)' },
                },
                rotating: {
                    '0%, 100%': { transform: 'rotate(360deg)' },
                    '50%': { transform: 'rotate(0deg)' },
                },
                topbottom: {
                    '0%, 100%': { transform: 'translate3d(0, -100%, 0)' },
                    '50%': { transform: 'translate3d(0, 0, 0)' },
                },
                bottomtop: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -100%, 0)' },
                },
            },
            animation: {
                linspin: 'linspin 1568.2353ms linear infinite',
                easespin:
                    'easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
                'left-spin':
                    'left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
                'right-spin':
                    'right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both',
                'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
                rotating: 'rotating 30s linear infinite',
                topbottom: 'topbottom 60s infinite alternate linear',
                bottomtop: 'bottomtop 60s infinite alternate linear',
                'spin-1.5': 'spin 1.5s linear infinite',
                'spin-2': 'spin 2s linear infinite',
                'spin-3': 'spin 3s linear infinite',
            },
            boxShadow: {
                yellow: '5px 43px 126px -3px rgba(5, 43, 126, 69%)',
                menudefault: '0 5px 10px -1px rgba(0,0,0,.2)',
                default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
                card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
                'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
                switcher:
                    '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
                'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
                1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
                2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
                3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
                4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
                5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
                6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
                7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
                8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
            },
        },
    },
    plugins: [],
};
export default config;
