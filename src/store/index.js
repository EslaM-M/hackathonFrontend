import RootReducer from './reducers'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = window._env_.NODE_ENV === 'staging'? createStore(RootReducer, composeEnhancers(
    applyMiddleware(thunk)
)) : createStore(RootReducer, applyMiddleware(thunk))



export default store;