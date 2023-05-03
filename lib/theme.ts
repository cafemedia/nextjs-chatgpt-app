import createCache from '@emotion/cache';
import { keyframes } from '@emotion/react';
import { JetBrains_Mono, Newsreader } from 'next/font/google';
import { extendTheme } from '@mui/joy';


// Theme & Fonts

// For next April Fools' week
// export const foolsMode = new Date().getMonth() === 3 && new Date().getDate() <= 7;

const newsreader = Newsreader({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace'],
});

export const theme = extendTheme({
  fontFamily: {
    body: newsreader.style.fontFamily,
    code: jetBrainsMono.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#f0edeb', // background.level4
        },
        primary: {
          // 50: '#F4FAFF', // softBg
          100: '#ecb5d2', // plainHoverBg  -  #DDF1FF | #f0f4ff | #f0f8ff (aliceblue)
          // 200: '#ADDBFF',
          // 300: '#6FB6FF',
          // 400: '#3990FF',
          // 500: '#096BDE', // solidBg [Button.solid]  -  #096BDE | #0D46D7 (suggested)
          // 600: '#054DA7', // solidHoverBg [IconButton.plain (fg)]
          // 700: '#02367D',
          // 800: '#072859',
          // 900: '#00153C',
        },
        neutral: {
          solidBg: '#6b65ff',
          solidHoverBg: '#e1dad4', // hover Neutral buttons (App Bar)
          // 50: '#F7F7F8',
          // 100: '#EBEBEF',
          // 200: '#D8D8DF',
          // 300: '#B9B9C6',
          // 400: '#8F8FA3',
          // 500: '#73738C',
          // 600: '#5A5A72', // solidBg [Button.solid]
          // 700: '#434356', // solidHoverBg
          // 800: '#25252D',
          // 900: '#131318',
        },
      },
    },
    dark: {
      palette: {
        background: {
          surface: '#e1dad4',
          level1: '#f0edeb',
          level2: '#ecb5d2',
          // popup: 'var(--joy-palette-common-black, #09090D)',
        },
      },
    },

  },
});

export const bodyFontClassName = newsreader.className;

export const cssRainbowColorKeyframes = keyframes`
  100%, 0% {
    color: rgb(255, 0, 0);
  }
  8% {
    color: rgb(204, 102, 0);
  }
  16% {
    color: rgb(128, 128, 0);
  }
  25% {
    color: rgb(77, 153, 0);
  }
  33% {
    color: rgb(0, 179, 0);
  }
  41% {
    color: rgb(0, 153, 82);
  }
  50% {
    color: rgb(0, 128, 128);
  }
  58% {
    color: rgb(0, 102, 204);
  }
  66% {
    color: rgb(0, 0, 255);
  }
  75% {
    color: rgb(127, 0, 255);
  }
  83% {
    color: rgb(153, 0, 153);
  }
  91% {
    color: rgb(204, 0, 102);
  }`;


// Emotion Cache (with insertion point on the SSR pass)

const isBrowser = typeof document !== 'undefined';

export function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    // On the client side, _document.tsx has a meta tag with the name "emotion-insertion-point" at the top of the <head>.
    // This assures that MUI styles are loaded first, and allows allows developers to easily override MUI styles with other solutions like CSS modules.
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}
