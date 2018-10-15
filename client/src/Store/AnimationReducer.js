import {GET_SPRING_COORDINATES, HEADER_CONFIG, SET_HEADER_COLOR, SET_MAIN_COLOR} from "./ActionsTypes";

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
    }
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
        default:
            return {
                ...state
            }
    }

}

export default AnimationReducer;