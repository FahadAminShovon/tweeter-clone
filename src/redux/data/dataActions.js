import {SET_SCREAM, SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from './dataTypes';
import axios from 'axios';
import { loadUI, setError, clearError } from '../UI/UIActions';

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

const deleteAction = (payload) => {
    return ({
        type:DELETE_SCREAM,
        payload
    })
}


const clearScreams = () => dispatch => {
    dispatch(setScreams([]));
}

const postScreamAction = (payload) => {
    return({
        type:POST_SCREAM,
        payload
    })
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

// Delete scream
export const deleteScream = screamId => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch(deleteAction(screamId));
        })
        .catch((err)=>console.log(err));
}

export const postScream = (newScream, handleClose) => dispatch => {
    dispatch(loadUI());
    axios.post('/scream', newScream)
        .then(res => {
            dispatch(postScreamAction(res.data));
            dispatch(clearError());
            handleClose();
        })
        .catch(err => {
            dispatch(setError(err.response.data));
        });
        
}