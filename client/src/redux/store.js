import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import  Books  from './books.js';
import Auth from './auth.js';
import Issues from './issues.js';
import Users from './users.js'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = ()=>{
    const store=createStore(
        combineReducers({
            books: Books,
            auth: Auth,
            issues: Issues,
            users: Users
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}