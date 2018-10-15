import {DESTORY_FAB, SET_DEVICE_TYPE, UNIVERSAL_FAB} from "./ActionsTypes";

const initialState = {
    isMobile: true,
    universalFab: {
        action: null,
        tip: null,
        color: null,
        mount: false,
        key: new Date().getTime(),
        icon: 'add'
    }
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_TYPE:
            return {
                ...state,
                isMobile: action.payload.isMobile
            }
        case UNIVERSAL_FAB:
            return {
                ...state,
                universalFab: {
                    ...state.universalFab,
                    action: action.payload.action || false,
                    tip: action.payload.tip,
                    color: action.payload.color || state.universalFab.color,
                    mount: action.payload.mount,
                    key: action.payload.key,
                    icon: action.payload.icon,
                }
            }
        case DESTORY_FAB:
            return {
                ...state,
                universalFab: {
                    ...initialState.universalFab,
                    color: state.universalFab.color,
                    icon: state.universalFab.icon,
                    key: new Date().getTime()
                }
            }
        default :
            return {
                ...state
            }
    }

}
export default themeReducer;
