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

var store = redux.createStore(reducer, /*preloadedState,*/
    window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
);  // Second argument is to initialize Redux Dev Tools

store.subscribe(()=>{
    var state = store.getState();
    document.getElementById('app').innerHTML = state.searchText;
    console.log('New Search Text',state.searchText);
});

var currentState = store.getState();
console.log('Current State', currentState);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'Work'
});

store.dispatch({
    type:'CHANGE_SEARCH_TEXT',
    searchText: 'Play'
});

store.dispatch({
    type:'CHANGE_SEARCH_TEXT',
    searchText: 'Sleep'
});
