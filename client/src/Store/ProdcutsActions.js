import axios from 'axios';
import {GET_ALL_PRODUCTS, SET_ACTIVE_PRODUCT} from "./ActionsTypes";

export const getAllProducts = _ => dispatch => {
    axios.get('/api/products')
        .then(res => {
            console.log(res.data.products);
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: {
                    products: res.data.products
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const setActiveProduct = id => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_PRODUCT,
        payload: {
            activeProduct: id
        }
    })
}