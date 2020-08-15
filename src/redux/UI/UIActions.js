import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING} from './UITypes';


export const loadUI = () => {
    return{
        type: LOADING_UI,
    }
}

export const clearError = () => {
    return{
        type: CLEAR_ERRORS,
    }
}

export const setError = (payload) => {
    return{
        type: SET_ERRORS,
        payload
    }
}

export const stopLoading = () => {
    return {
        type: STOP_LOADING
    }
}