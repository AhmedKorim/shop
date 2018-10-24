export const GET_SPRING_COORDINATES = 'GET_SPRING_COORDINATES';
export const HEADER_CONFIG = 'HEADER_CONFIG';

export const KEY_DOWN_EVENT = "KEY_DOWN_EVENT";

export const SET_HEADER_COLOR = "SET_HEADER_COLOR";
export const SET_DEVICE_TYPE = "SET_DEVICE_TYPE";
export const SET_CURRENT_SCROLL = "SET_CURRENT_SCROLL";

export const BROWSER_BACK = "BROWSER_BACK";
export const SET_MAIN_COLOR = "SET_MAIN_COLOR";


export const GET_PRODCUTS_COUNT = "GET_PRODCUTS_COUNT";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';

export const getSpringCoordinates = (coordinates) => {
    return dispatch => {
        dispatch({type: GET_SPRING_COORDINATES, payload: {coordinates}})
    }
}
export const getHeaderConfig = (attr) => {
    return dispatch => {
        dispatch({type: HEADER_CONFIG, payload: {...attr}})
    }
}

export const keyDownEvent = (e) => {
    return (dispatch, getState) => {
        dispatch({type: KEY_DOWN_EVENT, payload: {event: e}})
        const timeOut = setTimeout(function () {
            if (getState().events.keyDown.timeStamp === e.timeStamp) {
                dispatch({type: KEY_DOWN_EVENT, payload: {event: {...getState().events.keyDown, expired: true}}})
            }
            clearTimeout(timeOut)
        }, 100)
    }
}

export const setHeaderColor = (color) => {
    return dispatch => {
        dispatch({type: SET_HEADER_COLOR, payload: {color}})
    }
}
export const setMainColor = (color) => {
    return dispatch => {
        dispatch({type: SET_MAIN_COLOR, payload: {color}})
    }
}

export const setDeviceType = (isMobile) => {
    return dispatch => dispatch({type: SET_DEVICE_TYPE, payload: {isMobile}});
}


export const browserBack = (e) => {
    return (dispatch, getState) => {
        dispatch({type: BROWSER_BACK, payload: {event: e}})
        const timeOut = setTimeout(function () {
            if (getState().events.browserBack.timeStamp === e.timeStamp) {
                dispatch({type: BROWSER_BACK, payload: {event: {...getState().events.keyDown, expired: true}}})
            }
            clearTimeout(timeOut)
        }, 100)
    }
}

export const setCurrentScroll = scroll => dispatch => {
    if (scroll) {
        if (!isNaN(+scroll)) {
            dispatch({
                type: SET_CURRENT_SCROLL,
                payload: {
                    scroll
                }
            })
        }
    }
}
