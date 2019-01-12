var actions = require('./actions/index');

var store = require('./store/configureStore').configure();
/* Once we store the state, we can subscribe to the store.
Once we do that, anytime we update the state by dispatching an action, 
the callback function will be called */
var unsubscribe = store.subscribe(()=>{
    var state = store.getState();
    
    if(state.map.isLoading){
        document.getElementById('app').innerHTML='Loading...';
    }else if(state.map.url){
        document.getElementById('app').innerHTML='<a href="' +state.map.url+ ' "target="__blank"> View Your Location</a>';
    }
    console.log("New State",state);
});

//unsubscribe();

//Called First
var currentState = store.getState();
console.log('Name in Current State',currentState.name);

/* Dispatch an action to the reducer assigned to the store 
All dispatchers are called in order*/
store.dispatch(actions.changeName('Debanjan'));

//Dispatch the asynchronous functions
store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Debal'));

store.dispatch(actions.addHobby('Reading'));

store.dispatch(actions.addHobby('Cooking'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addMovie('Rambo','Action'));

store.dispatch(actions.addMovie('Baishe Srabon', 'Thriller'));

store.dispatch(actions.removeMovie(1));

store.dispatch(actions.addMovie('DDLJ', 'Romance'));


/* var newState = store.getState();
console.log('Name should be changed to Debanjan', newState); */

