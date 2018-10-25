import {GET_ALL_PRODUCTS, SET_ACTIVE_PRODUCT, SET_CART, TOGGLE_WISHLIST} from "./ActionsTypes";

const initialState = {
    products: [],
    activeProduct: null,
    wishlist: [],
    cart: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload.products
            };
        case SET_ACTIVE_PRODUCT:
            return {
                ...state,
                activeProduct: action.payload.activeProduct
            };
        case SET_CART:
            return {
                ...state,
                cart: action.payload.cart
            }
        case TOGGLE_WISHLIST:
            return {
                ...state,
                wishlist: action.payload.wishlist
            }
        default :
            return state
    }

}
export default productsReducer;
