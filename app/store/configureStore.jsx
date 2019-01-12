var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbyReducer, movieReducer, mapReducer}  = require('./../reducers/index');

export var configure = ()=>{
    //combined reducer
    //____________________________________________
    var reducer = redux.combineReducers({
        name: nameReducer, //state handled by this reducer is called name
        hobbies: hobbyReducer,
        movies: movieReducer,
        map: mapReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

    /*This is the store that contains the state
    Second arg is only needed to plugin the Redux Dev Tools*
    var store = redux.createStore(reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
    ); */ 

    /* This is the store that contains the state for the application.
    composeEnhancers is needed to include Redux Dev Tools Extension, without which,
     we could have just used redux.applyMiddleware directly */
    var store = redux.createStore(reducer, composeEnhancers(redux.applyMiddleware(thunk)));

    return store;
};
