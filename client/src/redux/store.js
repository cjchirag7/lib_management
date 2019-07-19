import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import  Books  from './books.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = ()=>{
    const store=createStore(
        combineReducers({
            books: Books
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}