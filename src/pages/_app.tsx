import '@/styles/globals.css'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'

const rootElement = () => document.getElementById("__next");

const theme = createTheme({
  typography: {
    fontFamily: " 'Noto Sans Thai', 'Noto Sans JP', sans-serif"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
  },
  components:{
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiMenu: {
      defaultProps: {
        container : rootElement
      }
    },
    MuiDrawer: {
      defaultProps: {
        container : rootElement
      }
    }
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <main className='w-full h-full flex flex-col items-center'>
          <div className='-z-[1] fixed top-0 left-0 w-full h-screen bg-[#EFEFEF]'/>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </StyledEngineProvider> 
  )
}