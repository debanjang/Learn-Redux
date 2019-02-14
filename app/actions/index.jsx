var axios = require('axios');

export var changeName = (name)=>{
    return {
        type: 'CHANGE_NAME',
        name //es6 notation for name:name
    }
};

export var addHobby = (hobby)=>{
    return{
        type:'ADD_HOBBIES',
        hobby //es6 notaion. Same as hobby:hobby
    }
};

export var removeHobby = (id)=>{
    return {
        type:'REMOVE_HOBBIES',
        id //es6 notaion. Same as id:id
    };
}; 

export var addMovie = (title, genre)=>{
    return {
        type:'ADD_MOVIES',
        title, //es6 notaion. Same as title:title
        genre //es6 notaion. Same as genre:genre
    }
};
 
export var removeMovie = (id)=>{
    return {
        type:'REMOVE_MOVIES',
        id //es6 notaion. Same as id:id
    }
}; 

export var startFetchingLocation = ()=>{
    return {
        type: 'START_FETCHING_LOCATION'
    };
};

export var completeFetchingLocation = (url) =>{
    return {
        type: 'COMPLETE_FETCHING_LOCATION',
        url //es6 notation. Same as url:url
    };
};

export var fetchLocation = ()=>{
    return (dispatch, getState)=>{ 
        //Set isLoading to true and clear out any previous URL by setting to undefined
        dispatch(startFetchingLocation());
        //fetch URL
        axios.get('https://ipinfo.io').then(function(resp){
            var loc = resp.data.loc;
            var baseURL = 'http://maps.google.com?q=';
            dispatch(completeFetchingLocation(baseURL + loc));
        });
    };
};