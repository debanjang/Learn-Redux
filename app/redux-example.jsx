var redux = require('redux');

var reducer = (state={name:'Anonymous'}, action)=>{
    //state = state || {name:Anonymous}. The version we are using instead is a es6 featue called arg defualt

    return state;
};

var store = redux.createStore(reducer);
var currentState = store.getState();
console.log("Current State",currentState);

