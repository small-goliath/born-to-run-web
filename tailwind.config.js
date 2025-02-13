/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        sm: '22.5rem',
        md: '48rem',
      },
      screens: {
        sm: '22.5rem',
        md: '48rem',
      },
      minWidth: {
        sm: '22.5rem',
        md: '48rem',
      },
      maxWidth: {
        sm: '22.5rem',
        md: '48rem',
      },
      colors: {
        primary: {
          G500: '#39974D',
          G400: '#50C85A',
          G300: '#67EB72',
        },
        secondary: {
          N900: '#111',
          N800: '#2A2A2A',
          N500: '#555555',
          N200: '#777777',
          N90: '#949494',
          N60: '#B7B7B7',
          N40: '#DFDFDF',
          N30: '#EFEFEF',
          N10: '#FCFCFC',
        },
        black: '#000',
        white: '#FFF',
        system: {
          b: {
            B500: '#0747A6',
            B400: '#0052CC',
            B50: '#DEEBFF',
          },
          g: {
            G500: '#006644',
            G400: '#00875A',
            G50: '#E3FCEF',
          },
          y: {
            Y500: '#FF8B00',
            Y400: '#FF991F',
            Y50: '#FFFAE6',
          },
          r: {
            R500: '#BF2600',
            R400: '#DE350B',
            R300: '#FF5630',
            R50: '#FFEBE6',
          },
        },
      },
      fontSize: {
        'display-lg': '3.5625rem',
        'display-md': '2.8125rem',
        'display-sm': '2.25rem',

        'headLine-lg': '2rem',
        'headLine-md': '1.75rem',
        'headLine-lg': '1.5rem',

        'title-xl': '1.375rem',
        'title-lg': '1.125rem',
        'title-md': '1rem',
        'title-sm': '0.875rem',

        'label-lg': '1.125rem',
        'label-md': '1rem',
        'label-sm': '0.875rem',
        'label-xs': '0.75rem',
        'label-xxs': '0.625rem',

        'body-lg': '1rem',
        'body-md': '0.875rem',
        'body-sm': '0.75rem',
        'body-xs': '0.625rem',
      },
      fontWeight: {
        bold: '700',
        md: '500',
        regular: '400',
      },
      lineHeight: {
        'display-lg': '4rem',
        'display-md': '3.25rem',
        'display-sm': '2.75rem',

        'headLine-lg': '2.5rem',
        'headLine-md': '2.25rem',
        'headLine-sm': '2.25rem',

        'title-xl': '1.75rem',
        'title-lg': '1.625rem',
        'title-md': '1.5rem',
        'title-sm': '1.25rem',

        'body-lg': '1.5rem',
        'body-md': '1.25rem',
        'body-sm': '1rem',
        'body-xs': '0.875rem',
      },
      letterSpacing: {
        'display-lg': '-0.01563rem',
        'display-md': '0',
        'display-sm': '0',

        'headLine-lg': '0',
        'headLine-md': '0',
        'headLine-sm': '0',

        'title-lg': '0',
        'title-md': '0.00938rem',
        'title-sm': '0.00625rem',

        'label-lg': '0.00938rem',
        'label-md': '0.00938rem',
        'label-sm': '0.01563rem',
        'label-xs': '0.00625rem',

        'body-lg': '0.03125rem',
        'body-md': '0.01563rem',
        'body-sm': '1rem',
      },
      borderRadius: {
        full: '100%',
        lg: '6.25rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        elevation10: '0px 1px 0px 0px rgba(33, 37, 41, 0.06)',
        elevation20: '0px 3px 3px -1px rgba(33, 37, 41, 0.10), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
        elevation30: '0px 6px 6px -1px rgba(33, 37, 41, 0.10), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
        elevation40: '0px 10px 10px -1px rgba(33, 37, 41, 0.10), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
        elevation50: '0px 16px 16px -1px rgba(33, 37, 41, 0.10), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
        elevation60: '0px 22px 32px -2px rgba(33, 37, 41, 0.12), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
        elevation70: '0px 32px 40px -2px rgba(33, 37, 41, 0.12), 0px 0px 5px 0px rgba(33, 37, 41, 0.06)',
      },
    },
  },
  plugins: [],
};
