var redux = require('redux');

var reducer = (state={name:'Anonymous'}, action)=>{
    //state = state || {name:Anonymous}. The version we are using instead is a es6 featue called arg defualt
    switch(action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('Current State',currentState);

store.dispatch({
    type:'CHANGE_NAME',
    name:'Debanjan'
});

var newState = store.getState();
console.log('Name should be changed to Debanjan', newState);

