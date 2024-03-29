import axios from 'axios';
import {addAsyncButton, GET_ALL_PRODUCTS, remvoeAsyncButton, SET_ACTIVE_PRODUCT, SET_CART, TOGGLE_COMPARED_LIST, TOGGLE_WISHLIST} from "./ActionsTypes";


// action createtos

const setCart = cart => ({
    type: SET_CART,
    payload: {
        cart
    }
})
const setWishlist = wishlist => ({
    type: TOGGLE_WISHLIST,
    payload: {
        wishlist
    }
})
const comparedList = comparedList => ({
    type: TOGGLE_COMPARED_LIST,
    payload: {
        comparedList
    }
})

export const getUerData = dispatch => {
    console.log('getting metadat');
    axios.get('/api/order')
        .then(({data}) => {
            dispatch(setCart(data.cart));
            dispatch(setWishlist(data.wishlist))
            dispatch(comparedList(data.comparedList))
        }).catch(err => console.log(err))
}

export const getAllProducts = _ => dispatch => {
    axios.get('/api/products')
        .then(res => {
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
    getUerData(dispatch)

}

export const setActiveProduct = id => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_PRODUCT,
        payload: {
            activeProduct: id
        }
    })
}


export const addProductToCart = (productId, count) => (dispatch, getState) => {
    // user is loggd in?
    const {cart} = getState().products;
    if (count === 0) {
        // remove item
        dispatch(addAsyncButton(productId + "cart"));
        cartRemoval(dispatch, productId, cart)
        return;
    }

    count = count || 1;
    const onCart = cart.find(({product}) => product === productId);
    let newCart = [...cart];
    if (onCart) {
        newCart = cart.map(cartItem => cartItem.product !== productId ? cartItem : {...cartItem, count});
    } else {
        newCart.push({
            product: productId,
            count
        })
    }
    // dispatch new cart
    // dispatch(setCart(newCart));
    // dispatch new async button
    dispatch(addAsyncButton(productId + "cart"));
    axios.post('/api/order/cart', {
        id: productId,
        count
    })
        .then(({data}) => {
            dispatch(remvoeAsyncButton(productId + "cart"));
            dispatch(setCart(data.cart));
            console.log(data, newCart);
        })
        .catch(err => {
            dispatch(remvoeAsyncButton(productId + "cart"));
            console.log(err.response);
        })
}
// ? actin creator
export const cartRemoval = (dispatch, productId, cart) => {
    // const newCart = cart.filter(cartItem => cartItem.product !== productId);
    axios.delete('/api/order/cart', {data: {id: productId}})
        .then(({data}) => {
            dispatch(remvoeAsyncButton(productId + "cart"));
            console.log(data.cart);
            dispatch(setCart(data.cart))
        }).catch(err => {
        dispatch(remvoeAsyncButton(productId + "cart"));
        console.log(err.response);
    })
}


export const removeProductFromCart = productId => (dispatch, getState) => {
    // user is loggd in?
    const cart = getState().products.cart;
    cartRemoval(dispatch, productId, cart)
}

export const toggleWishlist = productId => dispatch => {
    dispatch(addAsyncButton(productId + "wishlist"));
    axios.post('/api/order/wishlist', {id: productId})
        .then(({data}) => {
            dispatch(remvoeAsyncButton(productId + "wishlist"));
            dispatch(setWishlist(data.wishlist));
        })
        .catch(err => console.log(err))
}


export const toggleComparedList = productId => dispatch => {
    dispatch(addAsyncButton(productId + "compared"));
    axios.post('/api/order/compared', {id: productId})
        .then(({data}) => {
            dispatch(remvoeAsyncButton(productId + "compared"));
            dispatch(comparedList(data.comparedList));
        })
        .catch(err => console.log(err))
}