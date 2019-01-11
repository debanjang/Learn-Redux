var redux = require('redux');
var axios = require('axios');

/* A reducer is a pure function that combines the current 
state and an action to produce a new state. Called whenever 
an action is dispatched to the store associated with this reducer*/

//name reducer
//______________________________________________
var nameReducer = (state='Anonymous', action)=>{
    switch(action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};

var changeName = (name)=>{
    return {
        type: 'CHANGE_NAME',
        name //es6 notation for name:name
    }
};

//hobby reducer
//______________________________________________
var nextHobbyId = 1;
var hobbyReducer = (state=[], action)=>{
    switch(action.type){
        case 'ADD_HOBBIES':
            return [
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ];
        case 'REMOVE_HOBBIES':
            return state.filter((hobby)=>hobby.id!==action.id);
        default:
            return state;
    }
};

var addHobby = (hobby)=>{
    return{
        type:'ADD_HOBBIES',
        hobby //es6 notaion. Same as hobby:hobby
    }
};

var removeHobby = (id)=>{
    return {
        type:'REMOVE_HOBBIES',
        id //es6 notaion. Same as id:id
    };
}; 

//movie reducer
//_________________________________________
var nextMovieId = 1;
var movieReducer = (state=[], action)=>{
    switch(action.type){
        case 'ADD_MOVIES':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    title: action.title,
                    genre: action.genre
                }
            ];
        case 'REMOVE_MOVIES':
            return state.filter((movie)=>{
                return movie.id !== action.id;
            });
        default: 
            return state;
    }
};

var addMovie = (title, genre)=>{
    return {
        type:'ADD_MOVIES',
        title, //es6 notaion. Same as title:title
        genre //es6 notaion. Same as genre:genre
    }
};
 
var removeMovie = (id)=>{
    return {
        type:'REMOVE_MOVIES',
        id //es6 notaion. Same as id:id
    }
}; 

//map reducer and action generators
//__________________________________

var mapReducer = (state={isLoading: false, url: undefined}, action)=>{
    switch(action.type){
        case 'START_FETCHING_LOCATION':
            return {
                isLoading: true,
                url: undefined
            };
        case 'COMPLETE_FETCHING_LOCATION':
            return {
                isLoading: false,
                url: action.url
            }
        default:
            return state;
    }
};

var startFetchingLocation = ()=>{
    return {
        type: 'START_FETCHING_LOCATION'
    };
};

var completeFetchingLocation = (url) =>{
    return {
        type: 'COMPLETE_FETCHING_LOCATION',
        url //es6 notation. Same as url:url
    };
};

var fetchLocation = ()=>{
    //Set isLoading to true and clear out any previous URL by setting to undefined
    store.dispatch(startFetchingLocation());
    //fetch URL
    axios.get('https://ipinfo.io').then(function(resp){
        var loc = resp.data.loc;
            var baseURL = 'http://maps.google.com?q=';
            store.dispatch(completeFetchingLocation(baseURL + loc));
        });
};

//combined reducer
//____________________________________________
var reducer = redux.combineReducers({
    name: nameReducer, //state handled by this reducer is called name
    hobbies: hobbyReducer,
    movies: movieReducer,
    map: mapReducer
});

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
    
    if(state.map.isLoading){
        document.getElementById('app').innerHTML='Loading...';
    }else if(state.map.url){
        document.getElementById('app').innerHTML='<a href="' +state.map.url+ ' "target="__blank"> View Your Location</a>';
    }
    console.log("New State",state);
});

//Called First
var currentState = store.getState();
console.log('Name in Current State',currentState.name);

/* Dispatch an action to the reducer assigned to the store 
All dispatchers are called in order*/
store.dispatch(changeName('Debanjan'));

//Dispatch the asynchronous functions
fetchLocation();

store.dispatch(changeName('Debal'));

store.dispatch(addHobby('Reading'));

store.dispatch(addHobby('Cooking'));

store.dispatch(removeHobby(2));

store.dispatch(addMovie('Rambo','Action'));

store.dispatch(addMovie('Baishe Srabon', 'Thriller'));

store.dispatch(removeMovie(1));

store.dispatch(addMovie('DDLJ', 'Romance'));


/* var newState = store.getState();
console.log('Name should be changed to Debanjan', newState); */

