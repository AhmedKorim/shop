import {SET_CURRENT_USER} from "./ActionsTypes";

const initialState = {
    user: null,
    token: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        default :
            return {
                ...state
            }
    }

}
export default userReducer;
