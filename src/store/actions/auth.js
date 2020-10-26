import * as actionTypes from './actionTypes'
import API from '../../api'
import endpoints from '../../api/endpoints'

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}
export const loginSuccessful = authData => {
    return {
        type: actionTypes.LOGIN_SUCCESSFUL,
        authData
    }
}
export const loginFailed = error => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error
    }
}

export const login = (email, password) => {
    const userData = {
        email,
        password
    }
    return dispatch => {
        dispatch(loginStart())
        API.post(endpoints.sign_in, userData)
            .then(response => {
                const { data } = response
                const { token, role, owner, createdAt, expiry_date, refresh_token, is_expired } = data
                const authData = {
                    role,
                    token,
                    is_expired,
                    userId: owner,
                    created_at: createdAt,
                    expires_at: expiry_date,
                    refresh_token
                }
                localStorage.setItem('auth_data', JSON.stringify(authData))
                dispatch(loginSuccessful(authData))

            })
            .catch(err => {
                dispatch(loginFailed(err.response))
            })
    }
}

export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.LOG_OUT
    }
};