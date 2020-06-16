// Redux Saga effects
import { put } from 'redux-saga/effects'

// Actions
import { actions } from '../actions/order'

// Axios
import axios from 'axios-orders'

export function* purchaseStartSaga(action) {
    yield put(actions.loadStart())
    try {
        yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.loadEnd())
        yield put(actions.purchaseSuccess(action.orderData))

    } catch (err) {
        yield put(actions.loadEnd())
        yield put(actions.purchaseFailure({ ...err }.response.data.error.message))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.loadStart())
    
    const query = `?auth=${action.token}&orderBy="userToken"&equalTo="${action.userToken}"`

    try {
        const response = yield axios.get('orders.json' + query)
        const fetchOrders = []
        const resData = response.data

        for (const data in resData) {
            fetchOrders.push({
                id: data,
                customerName: resData[data].customer.name,
                totalPrice: resData[data].price,
                ingredients: resData[data].ingredients
            })
        }

        yield put(actions.loadEnd())
        yield put(actions.fetchOrdersSuccess(fetchOrders))

    } catch (err) {
        yield put(actions.loadEnd())
        yield put(actions.fetchOrdersFailure({ ...err }.response.data.error.message))
    }
}