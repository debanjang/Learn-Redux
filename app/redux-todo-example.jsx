var redux = require('redux');

var stateDefault = {
    searchText:'',
    showCompleted:false, 
    todos:[]
};
//pure function
var reducer = (state = stateDefault, action)=>{
    //state = state || {searchText:'', showCompleted:false, todos:[]};
    return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('Current State', currentState);