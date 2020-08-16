import {SET_SCREAM, SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT} from './dataTypes';
import axios from 'axios';
import { loadUI, setError, clearError, stopLoading } from '../UI/UIActions';

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

const setScream = (payload) => {
    return{
        type: SET_SCREAM,
        payload
    }
}

const submitCommentAction = (payload) => {
    return {
        type: SUBMIT_COMMENT,
        payload
    }
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

export const getScream = (screamId) => dispatch => {
    dispatch(loadUI());
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch(setScream(res.data));
            dispatch(stopLoading());
        })
        .catch(err => console.log(err));
} 

// Submit comment

export const submitComment = (screamId, commentData, setBody) => dispatch => {
    axios.post(`/scream/${screamId}/comment`,commentData)
        .then(res => {
            dispatch(submitCommentAction(res.data));
            dispatch(clearError());
            setBody('');
        })
        .catch(err => {
            console.log(err)
            dispatch(setError(err.response.data));
        });
}


export const getUserData = (userHandle) => dispatch => {
    dispatch(loadUI());
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch(setScreams(res.data.screams));
            dispatch(stopLoading())
        })
        .catch(err => {
            console.log(err);
            dispatch(setScream(null));
        })
}