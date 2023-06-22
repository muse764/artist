import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return <MuiThemeProvider theme={darkTheme}>{children}</MuiThemeProvider>;
}
