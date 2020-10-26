import * as actionTypes from '../actions/actionTypes'
const initialState = {
    loggedIn: false,
    error: false,
    loading: false,
    authData: {},
    errorMessage: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                authData: action.authData
            }
        case actionTypes.LOGIN_FAILED:
            //Capitalize error message 
            const { message } = action.error.data;
            const errorMessage = message.charAt(0).toUpperCase() + message.replace(message.charAt(0), "")
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage
            }
        case actionTypes.LOG_OUT:
            return initialState;
        default:
            return state
    }
}


export default authReducer;