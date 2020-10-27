import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import "./index.css";
import store from './store'
import App from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#11cb5f',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});
//Passing Router to all components in App.js
const app =
    <Provider store={store}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={4}>
        <ThemeProvider theme={theme}>
                    <App />
        </ThemeProvider>
                </SnackbarProvider>
            </BrowserRouter>
    </Provider>
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
