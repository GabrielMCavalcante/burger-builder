// Action types
import { AUTH_TYPES } from './actionTypes'

export const actions = {
    authStart() { return { type: AUTH_TYPES.AUTH_START } },
    
    authProcess(email, password, isSignup) {
        return { type: AUTH_TYPES.AUTH_PROCESS, email, password, isSignup }
    },

    authSuccess(authTokens) { return { type: AUTH_TYPES.AUTH_SUCCESS, authTokens } },

    authFailure(authError) { return { type: AUTH_TYPES.AUTH_FAILURE, authError } },

    signout() { return { type: AUTH_TYPES.AUTH_SIGNOUT_START } },

    newRedirect(redirectPath) {
        return { type: AUTH_TYPES.AUTH_REDIRECT, redirectPath }
    },

    checkAuthTimeout(expirationTime) {
        return { type: AUTH_TYPES.AUTH_CHECK_TIMEOUT, expirationTime }
    },

    checkAuthState() { return { type: AUTH_TYPES.AUTH_CHECK_STATE } }
}

export default {
    auth(email, password, isSignup) {
        return function (dispatch) {
            dispatch(actions.authProcess(email, password, isSignup))
        }
    },
    
    redirect(redirectPath) {
        return function (dispatch) {
            dispatch(actions.newRedirect(redirectPath))
        }
    },

    checkAuthState() {
        return function (dispatch) {
            dispatch(actions.checkAuthState())
        }
    }
}