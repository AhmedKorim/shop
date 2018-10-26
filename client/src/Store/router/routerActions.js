import {UPDATAE_HISTORY_ROUTER} from "./routerReducer";

export const setHistory = history => dispatch => {
    dispatch({
        type: UPDATAE_HISTORY_ROUTER,
        payload: {
            history
        }
    })
}