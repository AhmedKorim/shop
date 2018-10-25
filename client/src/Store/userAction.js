import axios from 'axios';
// actin createto
import {SET_CURRENT_USER} from "./ActionsTypes";

const setCurrentUser = (user, token) => {
    token = user ? token : null;
    return {
        type: SET_CURRENT_USER,
        payload: {
            user,
            token
        }
    }
}

export const login = (userData, history) => dispatch => {
    axios.post('/api/auth/login', userData)
        .then(({data: {token, user}}) => {
            dispatch(setCurrentUser(user, token))
            // set axios Authorization header
            // save the token to local storage
            localStorage.setItem("token", token);
            history.push('/products');
        })
        .catch(err => console.log(err.response))
}


export const logout = _ => dispatch => {
    dispatch(setCurrentUser(null))
}
export const register = userData => dispatch => {
    axios.post('/api/auth/register', userData).then(res => console.log(res))
        .catch(err => console.log(err.response.data))
    // dispatch errors ?
}

export const tryLogin = _ => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {

    }

}