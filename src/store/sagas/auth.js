// Redux Saga effects
import { put, delay, call } from 'redux-saga/effects'

// Action types
import { AUTH_TYPES } from '../actions/actionTypes'

// Actions
import { actions } from '../actions/auth'

// Axios
import axios from 'axios'

export function* signoutSaga() {
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'userToken')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield put({ type: AUTH_TYPES.AUTH_SIGNOUT })
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.signout())
}

export function* authSaga(action) {
    yield put(actions.authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACNeB1PDHu-PwsiS5EMkN5oSSCnKqUMq4'

    if (!action.isSignup)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACNeB1PDHu-PwsiS5EMkN5oSSCnKqUMq4'

    try {
        const response = yield axios.post(url, authData)

        const data = response.data
        const authTokens = {
            token: data.idToken,
            userToken: data.localId
        }

        const expirationDate = Date.now() + (data.expiresIn * 1000)

        yield localStorage.setItem('token', authTokens.token)
        yield localStorage.setItem('userToken', authTokens.userToken)
        yield localStorage.setItem('expirationDate', expirationDate)

        yield put(actions.authSuccess(authTokens))
        yield put(actions.checkAuthTimeout(data.expiresIn))

    } catch (err) {
        yield put(actions.authFailure({...err}.response.data.error.message))
    }
}

export function* checkAuthStateSaga() {
    const token = yield localStorage.getItem('token')

    if (!token) yield put(actions.signout())
    else {
        const expirationDate = +(yield localStorage.getItem('expirationDate'))
        const now = yield Date.now()

        if (now < expirationDate) {
            const userToken = yield localStorage.getItem('userToken')

            const authTokens = { token, userToken }

            const expirationTime = (expirationDate - new Date().getTime()) / 1000

            yield put(actions.authSuccess(authTokens))
            yield put(actions.checkAuthTimeout(expirationTime))
        }
    }
}