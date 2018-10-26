const initialState = {
    history: {
        location: {
            pathname: '@!@'
        }
    },
};
export const UPDATAE_HISTORY_ROUTER = 'UPDATAE_HISTORY_ROUTER';
const routerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATAE_HISTORY_ROUTER :
            return {
                ...state,
                history: action.payload.history
            }
        default :
            return {
                ...state
            }
    }

}
export default routerReducer;
