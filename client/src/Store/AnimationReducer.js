import {
    ADD_ASYNC_BUTTON,
    GET_SPRING_COORDINATES,
    HEADER_CONFIG,
    REMOVE_ASYNC_BUTTON,
    SET_CURRENT_SCROLL,
    SET_HEADER_COLOR,
    SET_MAIN_COLOR, TOGGLE_DRAWER
} from "./ActionsTypes";

const initialState = {
    spring: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    header: {
        height: null,
        color: null
    },
    main: {
        color: null
    },
    scroll: null,
    asyncButtonLoading: [],
    drawer: false
};

const AnimationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPRING_COORDINATES:
            return {
                ...state,
                spring: {
                    ...action.payload.coordinates
                }
            };
        case HEADER_CONFIG:
            return {
                ...state,
                header: {
                    ...state.header,
                    ...action.payload
                }
            }
        case SET_HEADER_COLOR:
            return {
                ...state,
                header: {
                    ...state.header,
                    color: action.payload.color
                }
            }
        case SET_MAIN_COLOR:
            return {
                ...state,
                main: {
                    ...state.main,
                    color: action.payload.color
                }
            }
        case SET_CURRENT_SCROLL:
            return {
                ...state,
                scroll: action.payload.scroll
            }
        case ADD_ASYNC_BUTTON:
            return {
                ...state,
                asyncButtonLoading: [
                    ...state.asyncButtonLoading,
                    action.payload.asyncButtonId
                ]
            }
        case REMOVE_ASYNC_BUTTON:
            return {
                ...state,
                asyncButtonLoading: state.asyncButtonLoading.filter(asyncButtonId => asyncButtonId !== action.payload.asyncButtonId)
            }
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawer: !state.drawer
            }
        default:
            return {
                ...state
            }
    }

}

export default AnimationReducer;