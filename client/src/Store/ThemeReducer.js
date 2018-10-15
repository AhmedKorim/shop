import {DESTORY_FAB, SET_DEVICE_TYPE, UNIVERSAL_FAB} from "./ActionsTypes";

const initialState = {
    isMobile: true,
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_TYPE:
            return {
                ...state,
                isMobile: action.payload.isMobile
            }

        default :
            return {
                ...state
            }
    }

}
export default themeReducer;
