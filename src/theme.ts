import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#dc3545',
    },
    background: {
      default: '#f8f8f8', 
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.8rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      marginBottom: '0.5rem',
    },
    button: {
      textTransform: 'uppercase',
    },
  },
});

export default theme;
