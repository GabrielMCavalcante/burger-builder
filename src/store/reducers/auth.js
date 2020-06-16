// Action types
import { AUTH_TYPES, STATUS_TYPES } from '../actions/actionTypes'

// Utility functions
import { updateObject } from 'shared/utility'

// initialState
const initialState = {
    token: null,
    userToken: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    redirectPath: '/home'
}

function authStart(state) {
    return updateObject(state, { 
        loading: true, 
        error: null, 
        isAuthenticated: false, 
        token: null, 
        userToken: null 
    })
}  

function authSuccess(state, action) {
    return updateObject(state, {
        userToken: action.authTokens.userToken, 
        token: action.authTokens.token,
        loading: false, 
        error: null,
        isAuthenticated: true
    })
}

function authFailure(state, action) {
    return updateObject(state, {
        loading: false,
        error: action.authError,
        isAuthenticated: false, 
        token: null, 
        userToken: null
    })
}

function authSignout(state) {
    return updateObject(state, { 
        isAuthenticated: false, 
        token: null, 
        userToken: null,
        redirectPath: "/home" 
    })
}

function authRedirect(state, action) {
    return updateObject(state, { redirectPath: action.redirectPath })
}

function error(state, action) {
    return updateObject(state, { error: action.error })
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH_TYPES.AUTH_START: return authStart(state)
        case AUTH_TYPES.AUTH_SUCCESS: return authSuccess(state, action)
        case AUTH_TYPES.AUTH_FAILURE: return authFailure(state, action)
        case AUTH_TYPES.AUTH_SIGNOUT: return authSignout(state)
        case AUTH_TYPES.AUTH_REDIRECT: return authRedirect(state, action)
        case STATUS_TYPES.ERROR: return error(state, action)
        default: return state
    }
}