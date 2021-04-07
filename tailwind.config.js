const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
    mode: 'jit',
    purge: ["./components/**/*.ts", "./pages/**/*.ts", "./components/**/*.tsx", "./pages/**/*.tsx"],
    darkMode: 'class',
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            black: '#000000',
            white: '#FFFFFF',

            gray: colors.trueGray,
            red: {
                100: '#FFF5F5',
                200: '#FED7D7',
                300: '#FEB2B2',
                400: '#FC8181',
                500: '#F56565',
                600: '#E53E3E',
                700: '#C53030',
                800: '#9B2C2C',
                900: '#742A2A',
            },
            orange: {
                100: '#FFFAF0',
                200: '#FEEBC8',
                300: '#FBD38D',
                400: '#F6AD55',
                500: '#ED8936',
                600: '#DD6B20',
                700: '#C05621',
                800: '#9C4221',
                900: '#7B341E',
            },
            yellow: {
                100: '#FFFFF0',
                200: '#FEFCBF',
                300: '#FAF089',
                400: '#F6E05E',
                500: '#ECC94B',
                600: '#D69E2E',
                700: '#B7791F',
                800: '#975A16',
                900: '#744210',
            },
            green: {
                100: '#F0FFF4',
                200: '#C6F6D5',
                300: '#9AE6B4',
                400: '#68D391',
                500: '#48BB78',
                600: '#38A169',
                700: '#2F855A',
                800: '#276749',
                900: '#22543D',
            },
            teal: {
                100: '#E6FFFA',
                200: '#B2F5EA',
                300: '#81E6D9',
                400: '#4FD1C5',
                500: '#38B2AC',
                600: '#319795',
                700: '#2C7A7B',
                800: '#285E61',
                900: '#234E52',
            },
            blue: {
                100: '#EBF8FF',
                200: '#BEE3F8',
                300: '#90CDF4',
                400: '#63B3ED',
                500: '#4299E1',
                600: '#3182CE',
                700: '#2B6CB0',
                800: '#2C5282',
                900: '#2A4365',
            },
            indigo: {
                100: '#EBF4FF',
                200: '#C3DAFE',
                300: '#A3BFFA',
                400: '#7F9CF5',
                500: '#667EEA',
                600: '#5A67D8',
                700: '#4C51BF',
                800: '#434190',
                900: '#3C366B',
            },
            purple: {
                100: '#FAF5FF',
                200: '#E9D8FD',
                300: '#D6BCFA',
                400: '#B794F4',
                500: '#9F7AEA',
                600: '#805AD5',
                700: '#6B46C1',
                800: '#553C9A',
                900: '#44337A',
            },
            pink: {
                100: '#FFF5F7',
                200: '#FED7E2',
                300: '#FBB6CE',
                400: '#F687B3',
                500: '#ED64A6',
                600: '#D53F8C',
                700: '#B83280',
                800: '#97266D',
                900: '#702459',
            },
            dark: {
                ...colors.trueGray,
                150: '#EDEDED',
                350: '#BCBCBC',
                650: '#494949',
                750: '#333333',
                850: '#202023',
                950: '#0C0C0C'
            }
        },
        extend: {
            gridTemplateColumns: {
                '3-auto': `auto auto auto`,
                'content': `0.6fr 1.8fr 0.6fr`
            },
            minHeight: {
                'with-nav': 'calc(100vh - 4rem);',
                'with-ad': 'calc(100vh - 22rem);'
            },
            maxHeight: {
                'with-nav': 'calc(100vh - 4rem);',
                '48perc': '48%',
                'with-ad': 'calc(100vh - 22rem);'
            },
            height: {
                'with-nav': 'calc(100vh - 4rem);',
                'half-screen': `50vh`,
                'with-ad': 'calc(100vh - 22rem);',
                '25': '6.25rem'

            },
            width: {
                '48perc': '48%',
                '72': "18rem",
                'content': `calc(100vw - 18rem)`
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'dark', 'group-hover'],
        borderColor: ['responsive', 'hover', 'focus', 'dark'],
        ringWidth: ['hover', 'active'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
        visibility: ['hover', 'focus', 'group-hover']
    },
    plugins: [],
};
