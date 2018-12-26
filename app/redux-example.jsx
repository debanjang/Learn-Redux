var redux = require('redux');

var defaultState = {
    name: 'Anonymous',
    hobbies:[],
    movies:[]
};

var nextHobbyId = 1;
var nextMovieId = 1;

/* A reducer is a pure function that combines the current 
state and an action to produce a new state. Called whenever 
an action is dispatched to the store associated with this reducer*/
var reducer = (state=defaultState, action)=>{
    //state = state || {name:Anonymous}. The version we are using instead is a es6 featue called arg defualt
    switch(action.type){
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'ADD_HOBBIES':
            return {
                ...state, //grab the current state and override the hobbies
                hobbies: [ 
                    ...state.hobbies, //grab the current hobbies and add the new object to hobbies
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            };
        case 'REMOVE_HOBBIES':
            return {
                ...state, //grab the current state and override the hobbies
                hobbies: state.hobbies.filter((hobby)=>{ //return true to keep an object, return false to remove
                    return hobby.id !== action.id;
                })
            };
        case 'ADD_MOVIES':
            return {
                ...state,
                movies: [
                    ...state.movies,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ]
            };
        case 'REMOVE_MOVIES':
            return {
                ...state,
                movies: state.movies.filter((movie)=>movie.id!== action.id) //same as last filter, in a single line
            };
        default:
            return state;
    }
};

/*This is the store that contains the state
Second arg is only needed to plugin the Redux Dev Tools*/
var store = redux.createStore(reducer, /*preloadedState,*/
    window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
); 

/* Once we store the state, we can subscribe to the store.
Once we do that, anytime we update the state by dispatching an action, 
the callback function will be called */
store.subscribe(()=>{
    var state = store.getState();
    document.getElementById('app').innerHTML=state.name;
    console.log('Name in New State',state.name);

    console.log("New State",state);
});

//Called First
var currentState = store.getState();
console.log('Name in Current State',currentState.name);

/* Dispatch an action to the reducer assigned to the store 
All dispatchers are called in order*/
store.dispatch({
    type:'CHANGE_NAME',
    name:'Debanjan'
});

store.dispatch({
    type:'CHANGE_NAME',
    name:'Debal'
});

store.dispatch({
    type: 'ADD_HOBBIES',
    hobby: 'Reading'
});

store.dispatch({
    type: 'ADD_HOBBIES',
    hobby: 'Cooking'
});

store.dispatch({
    type: 'REMOVE_HOBBIES',
    id: 2  //the id to remove from the array
});

store.dispatch({
    type: 'ADD_MOVIES',
    title: 'Rambo',
    genre: 'Action'
});

store.dispatch({
    type: 'ADD_MOVIES',
    title: 'Baishe Srabon',
    genre: 'Thriller'
});

store.dispatch({
    type: 'REMOVE_MOVIES',
    id: 1
});

store.dispatch({
    type: 'ADD_MOVIES',
    title: 'DDLJ',
    genre: 'Romance'
});


/* var newState = store.getState();
console.log('Name should be changed to Debanjan', newState); */

