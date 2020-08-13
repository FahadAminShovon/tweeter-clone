import axios from "axios";
import { clearError, setError, loadUI} from "../UI/UIActions";
import {SET_USER, SET_UNAUTHENTICATED} from './userTypes';

export const set_user = (payload) => {
    return({
        type: SET_USER,
        payload: payload 
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
    axios.get('/user')
        .then(res => {
            dispatch(set_user(res.data));
        })
        .catch(err => console.log(err));
}

export const logoutUser = (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(unAuthUser());
}


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}