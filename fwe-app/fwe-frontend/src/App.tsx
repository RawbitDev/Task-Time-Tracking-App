import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { DarkModeContext } from './contexts/DarkModeContext';
import { DashboardPage } from './pages/Dashboard/DashboardPage/DashboardPage';
import useLocalStorage from './util/LocalStorageHook';

export const App = () => {
  const [darkModeState, setDarkModeState] = useLocalStorage('App.darkModeState', true);

  const toggleDarkModeState = () => {
    setDarkModeState(!darkModeState);
  };

  const darkMode = {
    darkMode: darkModeState,
    toggleDarkMode: toggleDarkModeState,
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiTypography: {
            root: {
              wordBreak: 'break-all',
            },
          },
        },
        palette: {
          type: darkModeState ? 'dark' : 'light',
        },
      }),
    [darkModeState],
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10}>
        <CssBaseline />
        <DarkModeContext.Provider value={darkMode}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={DashboardPage} />
            </Switch>
          </BrowserRouter>
        </DarkModeContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
