import {BROWSER_BACK, KEY_DOWN_EVENT} from "./ActionsTypes";

const initialState = {
    keyDown: null,
    browserBack: null,
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case KEY_DOWN_EVENT:
            return {
                ...state,
                keyDown: action.payload.event
            }
        case BROWSER_BACK:
            return {
                ...state,
                browserBack: action.payload.event
            }
        default :
            return {
                ...state
            }
    }

}
export default EventReducer;
