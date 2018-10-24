import {GET_ALL_PRODUCTS, SET_ACTIVE_PRODUCT} from "./ActionsTypes";

const initialState = {
    products: [],
    activeProduct: null
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

        default :
            return state
    }

}
export default productsReducer;
