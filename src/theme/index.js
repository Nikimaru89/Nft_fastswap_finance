import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material/styles'

export const light = createTheme({
  typography: {
    fontFamily: 'CircularStd',
    h2: {
      fontSize: 72,
      lineHeight: '72px',
      fontWeight: 700
    },
    h3: {
      fontSize: 50,
      lineHeight: '72px',
      fontWeight: 700
    },
    h4: {
      fontSize: 34,
      fontWeight: 700
    },
    h5: {
      fontSize: 24,
      fontWeight: 600
    },
    h6: {
      fontSize: 20,
      fontWeight: 600
    },
    body1: {
      fontSize: 18,
      fontWeight: 400
    },
    body2: {
      fontSize: 14,
      fontWeight: 500
    },
    button: {
      fontSize: 18,
      fontWeight: 300
    },
    caption: {
      fontSize: 12,
      fontWeight: 500,
      display: 'block'
    },
    subtitle1: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 300
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 500
    },
    inherit: {
      fontSize: 14,
      fontWeight: 600
    },
    overline: {
      fontSize: 12,
      fontWeight: 300
    }
  },
  palette: {
    primary: {
      main: '#566FFE'
    },
    secondary: {
      main: '#183B56'
    },
    text: {
      main: '#183B56',
      primary: '#748398'
    },
    background: {
      main: '#FAF9FA'
    }
  }
})

export const dark = createTheme({
  typography: {
    fontFamily: 'CircularStd',
    h2: {
      fontSize: 72,
      lineHeight: '72px',
      fontWeight: 700
    },
    h3: {
      fontSize: 50,
      lineHeight: '72px',
      fontWeight: 700
    },
    h4: {
      fontSize: 34,
      fontWeight: 700
    },
    h5: {
      fontSize: 24,
      fontWeight: 600
    },
    h6: {
      fontSize: 20,
      fontWeight: 600
    },
    body1: {
      fontSize: 18,
      fontWeight: 400
    },
    body2: {
      fontSize: 14,
      fontWeight: 500
    },
    button: {
      fontSize: 18,
      fontWeight: 300
    },
    caption: {
      fontSize: 12,
      fontWeight: 500,
      display: 'block'
    },
    subtitle1: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 300
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 500
    },
    inherit: {
      fontSize: 14,
      fontWeight: 600
    },
    overline: {
      fontSize: 12,
      fontWeight: 300
    }
  },
  palette: {
    primary: {
      main: '#27262C'
    },
    secondary: {
      main: '#ffffff'
    },
    text: {
      main: '#EAE2FC',
      primary: '#FFFFFF'
    },
    background: {
      main: '#1D1D22'
    }
  }
})

export const theme = localStorage.getItem("IS_DARK") === "true" ? dark : light

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary}; 
      border-radius: 8px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.primary}; 
      border-radius: 10px;
    }
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: ${({ theme }) => theme.bg6};
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }
`
