/** @type {import('tailwindcss').Config} */
export default {
    content: [
        '/index.html',
        './src/**/*.{js,jsx,ts,tsx,vue}'
    ],
    darkMode: 'class',

    theme: {

        screens: {
            xs: "614px",//极小
            sm: "902px",//小
            md: "1022px",//中等
            lg: "1092px",//大
            xl: "1280px",//极大
        },

        extend: {

            colors: {
                dim: {
                    50: "#5F99F7",
                    100: "#5F99F7",
                    200: "#38444d",
                    300: "#202e3a",
                    400: "#253341",
                    500: "#5F99F7",
                    600: "#5F99F7",
                    700: "#192734",
                    800: "#162d40",
                    900: "#15202b",
                },
            },

        },
    },

    plugins: [
    ]
}