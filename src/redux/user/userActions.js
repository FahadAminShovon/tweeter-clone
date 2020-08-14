import axios from "axios";
import { clearError, setError, loadUI} from "../UI/UIActions";
import {SET_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_USER} from './userTypes';

export const setUser = (payload) => {
    return({
        type: SET_USER,
        payload: payload 
    })
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const authenticateUser = () => {
    return ({
        type: SET_AUTHENTICATED
    })
}

export const unAuthUser = () => {
    return({
        type: SET_UNAUTHENTICATED
    })
}

export const loginUser = (userData, history) => (dispatch) => {
    dispatch(loadUI());
    axios.post('/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch(clearError());
                history.push('/');
            })
            .catch(err => {
                console.log(err.response);
                dispatch(setError(err.response.data));
            })
}


export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch(loadUI());
    axios.post('/signup', newUserData)
            .then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch(clearError());
                history.push('/');
            })
            .catch(err => {
                dispatch(setError(err.response.data));
            })
}

export const getUserData = () => (dispatch) => {
    dispatch(loadingUser());
    axios.get('/user')
        .then(res => {
            dispatch(setUser(res.data));
        })
        .catch(err => console.log(err));
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(unAuthUser());
}


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch(loadingUser());
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch(loadingUser());
    axios.post('/user',userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}