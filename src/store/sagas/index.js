// Redux Saga effects
import { takeEvery, all, takeLatest } from 'redux-saga/effects'

// Sagas
import * as authActions from './auth'
import * as burgerBuilderActions from './burgerBuilder'
import * as orderActions from './order'

// Action types
import { AUTH_TYPES, BURGERBUILDER_TYPES, ORDER_TYPES } from '../actions/actionTypes'

// Auth actions watcher
export function* watchAuth() {
    yield all([
        takeLatest(AUTH_TYPES.AUTH_SIGNOUT_START, authActions.signoutSaga),
        takeEvery(AUTH_TYPES.AUTH_CHECK_TIMEOUT, authActions.checkAuthTimeoutSaga),
        takeLatest(AUTH_TYPES.AUTH_PROCESS, authActions.authSaga),
        takeEvery(AUTH_TYPES.AUTH_CHECK_STATE, authActions.checkAuthStateSaga)
    ])
}

// BurgerBuilder actions watcher
export function* watchBurgerBuilder() {
    yield all([
        takeEvery(
            BURGERBUILDER_TYPES.INIT_INGREDIENTS,
            burgerBuilderActions.initIngredientsSaga
        ),
        takeEvery(
            BURGERBUILDER_TYPES.INIT_INGREDIENTS_PRICE,
            burgerBuilderActions.initIngredientPriceSaga
        ),
        takeEvery(
            BURGERBUILDER_TYPES.INIT_BASE_PRICE,
            burgerBuilderActions.initBasePriceSaga
        )
    ])
}

// Order actions watcher
export function* watchOrder() {
    yield all([
        takeLatest(ORDER_TYPES.PURCHASE_START, orderActions.purchaseStartSaga),
        takeEvery(ORDER_TYPES.FETCH_ORDERS_START, orderActions.fetchOrdersSaga)
    ])
}