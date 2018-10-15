const initialState = {
        products: [],
        productsCount: null
    };

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODCUTS_COUNT:
            return {}
        default :
            return {
                ...state
            }
    }

}
export default productsReducer;
