import axios from 'axios';
import jwt_decore from 'jwt-decode';
import {setAuthToken} from "../Shared/axios";
import {SET_CURRENT_USER} from "./ActionsTypes";


// action creator
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

// ? login
export const login = (userData, history) => dispatch => {
    axios.post('/api/auth/login', userData)
        .then(({data: {token, user}}) => {
            dispatch(setCurrentUser(user, token))
            // set axios Authorization header
            setAuthToken(token);
            // save the token to local storage
            localStorage.setItem("token", token);
            history.push('/products');
            // auto logout if user timeout
            const {exp} = jwt_decore(token);
            const expirationTimeout = exp * 1000 - Date.now();
            setTimeout(_ => dispatch(logout()), expirationTimeout)
        })
        .catch(err => console.log(err.response))
}

// ? log out user
export const logout = _ => dispatch => {
    dispatch(setCurrentUser(null))
    // remove from local storage
    localStorage.removeItem("token");
    // remove the header
    setAuthToken(null)
}

// ? reg
export const register = userData => dispatch => {
    axios.post('/api/auth/register', userData).then(res => console.log(res))
        .catch(err => console.log(err.response.data))
    // dispatch errors ?
}
// ? try login in on appload
export const tryLogin = _ => dispatch => {
    const token = localStorage.token;
    if (token) { // token ?
        const {exp, id: _id, name} = jwt_decore(token);
        const currentTime = Date.now();
        // compare time
        if (exp > currentTime / 1000) {
            // remove token if timeout
            const expirationTimeout = exp * 1000 - currentTime;
            setTimeout(_ => dispatch(logout()), expirationTimeout)
            // set current user
            dispatch(setCurrentUser({_id, name}, token));
            // setting Authorization header
            setAuthToken(token);
        } else {
            // clear form local storage
            console.log('clear from localstoreage');
        }
    }
}