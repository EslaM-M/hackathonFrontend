import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import "./index.css";
import store from './store'
import App from './App';

//Passing Router to all components in App.js
const app =
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
