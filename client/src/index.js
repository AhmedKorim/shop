import {createMuiTheme} from "@material-ui/core";
import {pink} from "@material-ui/core/colors";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from "react-redux/src/components/Provider";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import App from './Containers/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import AnimationReducer from "./Store/AnimationReducer";
import userReducer from "./Store/authReducer";
import EventReducer from "./Store/EventReducer";
import productsReducer from "./Store/ProductsReducer";
import routerReducer from "./Store/router/routerReducer";
import themeReducer from "./Store/ThemeReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        animations: AnimationReducer,
        events: EventReducer,
        theme: themeReducer,
        products: productsReducer,
        auth: userReducer,
        router: routerReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);
const theme = createMuiTheme({
    shape: {
        borderRadius: .4
    },
    palette: {

        secondary: {
            main: pink[500],
            light: pink[400],
            dark: pink.A700
        },
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
