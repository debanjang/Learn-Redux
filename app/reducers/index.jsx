/* A reducer is a pure function that combines the current 
state and an action to produce a new state. Called whenever 
an action is dispatched to the store associated with this reducer*/

export var nameReducer = (state='Anonymous', action)=>{
    switch(action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};

var nextHobbyId = 1;
export var hobbyReducer = (state=[], action)=>{
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

var nextMovieId = 1;
export var movieReducer = (state=[], action)=>{
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

export var mapReducer = (state={isLoading: false, url: undefined}, action)=>{
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

