// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                hsl: {
                    100: "hsl(0,0%,90%)",
                    200: "hsl(0,0%,80%)",
                    300: "hsl(0,0%,70%)",
                    400: "hsl(0,0%,60%)",
                    500: "hsl(0,0%,50%)",
                    600: "hsl(0,0%,40%)",
                    700: "hsl(0,0%,30%)",
                    800: "hsl(0,0%,20%)",
                    850: "hsl(0,0%,15%)",
                    900: "hsl(0,0%,10%)"
                },
                gray: {
                    ...colors.trueGray,
                    150: "#EDEDED",
                    250: "#DDDDDD",
                    825: "#232323",
                    850: "#1F1F1F",
                    875: "#1B1B1B",
                    950: "#121212"
                },
                blue: {
                    ...colors.sky,
                    75: "#E8F6FF",
                    150: "#CDECFE",
                    250: "#9CDDFD",
                    350: "#5BC8FA",
                    450: "#23B1F1",
                    550: "#0895D8",
                    650: "#0377B4",
                    750: "#056193",
                    850: "#0A527A",
                    950: "#062537"
                },
                oldBlue: {
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
                darkBlue: {
                    50: "#F5FAFD",
                    100: "#EBF4FA",
                    200: "#D0E6F1",
                    300: "#A9D4E8",
                    400: "#6EB0CE",
                    500: "#418CAE",
                    600: "#2A6B8D",
                    700: "#225571",
                    800: "#174056",
                    900: "#123143"
                },
                teal: colors.teal,
                cyan: colors.cyan,
                rose: colors.rose,
                emerald: colors.emerald,
                amber: colors.amber,
                orange: colors.orange
            },
            height: {
                "18": "4.5rem",
                "content": "calc(100vh - 4.5rem)",
                'with-ad': 'calc(100vh - 23rem);',
            },
            minHeight: {
                'with-ad': 'calc(100vh - 23rem);',
            },
            width: {
                content: "calc(100vw - (100vw - 100%) - 20rem)"
            },
            minWidth: {
                prose: "65ch"
            },
            maxWidth: {
                "minus-scroll": "calc(100vw - (100vw - 100%))",
                content: "calc(100vw - (100vw - 100%) - 20rem)"
            },
            inset: {
                "18": "4.5rem"
            },
            fontSize: {
                "3.5xl": "2rem"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({addUtilities, theme}) {
            const colors = theme("colors");
            const newUtilities = {
                '.scrollbar-h-2': {
                    scrollbarWidth: "thin",
                    '&::-webkit-scrollbar': {
                        width: "0.5rem",
                        height: "0.5rem"
                    }
                },
                '.scrollbar-dark': {
                    scrollbarColor: `${colors.darkBlue["600"]} ${colors.gray["700"]}`,
                    '&::-webkit-scrollbar-track': {
                        background: colors.gray["700"]
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: colors.darkBlue["600"],
                    }
                },
                '.scrollbar-light': {
                    scrollbarColor: `${colors.darkBlue["400"]} ${colors.gray["300"]}`,
                    '&::-webkit-scrollbar-track': {
                        background: colors.gray["300"]
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: colors.darkBlue["400"],
                    }
                }

            }

            addUtilities(newUtilities)
        })
    ],
}
