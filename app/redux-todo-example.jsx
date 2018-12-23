var redux = require('redux');

var stateDefault = {
    searchText:'',
    showCompleted:false, 
    todos:[]
};
//pure function
var reducer = (state = stateDefault, action)=>{
    //state = state || {searchText:'', showCompleted:false, todos:[]};

    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            };
        default:
            return state
    }
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('Current State', currentState);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'New Search Text'
});

var newState = store.getState();
console.log('Search Text Should Have Changed', newState);