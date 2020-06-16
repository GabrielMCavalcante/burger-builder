import reducer from './auth'

import { AUTH_TYPES, STATUS_TYPES } from '../actions/actionTypes'

describe('[REDUX][REDUCERS][auth]', () => {

    let initialState

    beforeEach(() => {
        initialState = {
            token: null,
            userToken: null,
            error: null,
            loading: false,
            isAuthenticated: false,
            redirectPath: '/home'
        }
    })

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set loading to true during auth', () => {
        expect(reducer(initialState, {
            type: AUTH_TYPES.AUTH_START
        })).toEqual({
            ...initialState,
            loading: true,
            error: null,
            isAuthenticated: false,
            token: null,
            userToken: null
        })
    })

    it('should store the token upon login', () => {
        expect(reducer(initialState, {
            type: AUTH_TYPES.AUTH_SUCCESS,
            authData: { token: 'test', userToken: 'usertest' }
        })).toEqual({
            ...initialState,
            token: 'test',
            userToken: 'usertest',
            isAuthenticated: true,
        })
    })

    it('should store the error upon auth failure', () => {
        expect(reducer(initialState, {
            type: AUTH_TYPES.AUTH_FAILURE,
            authError: 'error'
        })).toEqual({
            ...initialState,
            loading: false,
            error: 'error',
            isAuthenticated: false,
            token: null,
            userToken: null
        })
    })

    it('should remove token upon logout', () => {
        expect(reducer(initialState, {
            type: AUTH_TYPES.AUTH_SIGNOUT
        })).toEqual({
            ...initialState,
            isAuthenticated: false,
            token: null,
            userToken: null,
            redirectPath: "/home"
        })
    })

    it('should change redirectPath', () => {
        expect(reducer(initialState, {
            type: AUTH_TYPES.AUTH_REDIRECT,
            redirectPath: '/test'
        })).toEqual({
            ...initialState,
            redirectPath: '/test'
        })
    })

    it('should set error message upon error', () => {
        expect(reducer(initialState, {
            type: STATUS_TYPES.ERROR,
            error: 'error'
        })).toEqual({
            ...initialState,
            error: 'error'
        })
    })
})