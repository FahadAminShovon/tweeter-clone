import {SET_SCREAM, SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from './dataTypes';
import axios from 'axios';

const loadingScream = () => {
    return{
        type:LOADING_DATA
    }
}
const like = (payload) => {
    return({
        type:LIKE_SCREAM,
        payload
    })
}

const unlike = (payload) => {
    return({
        type:UNLIKE_SCREAM,
        payload
    })
}

const setScreams = (payload) => {
    return{
        type:SET_SCREAMS,
        payload
    }
}

const clearScreams = () => dispatch => {
    dispatch(setScreams([]));
}

// Get all screams
export const getScreams = () => dispatch => {
    dispatch(loadingScream());
    axios.get('/screams')
        .then(res => {
            dispatch(setScreams(res.data));
        })
        .catch(err=> {
            dispatch(clearScreams());
            console.log(err.response);
        })
}

// Like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch(like(res.data));
        })
        .catch(err => console.log(err));
}
// Unlike Scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch(unlike(res.data));
        })
        .catch(err => console.log(err));
}
