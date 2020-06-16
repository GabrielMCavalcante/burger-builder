// Action types
import { ORDER_TYPES } from '../actions/actionTypes'

// Utility
import { updateObject } from 'shared/utility'

// Initial state
const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

function loadStart(state) {
    return updateObject(state, { loading: true, purchased: false })
}

function loadEnd(state) {
    return updateObject(state, { loading: false })
}

function purchaseSuccess(state, action) {
    return updateObject(state, { 
        orders: [ ...state.orders, action.orderData ], 
        purchased: true 
    })
}

function resetPurchased(state) {
    return updateObject(state, { purchased: false })
}

function fetchOrdersSuccess(state, action) {
    return updateObject(state, { orders: action.orders })
}

function fetchOrdersFailure(state, action) {
    return updateObject(state, { error: action.error })
}

function orderReducer(state = initialState, action) {
    switch (action.type) {
        case ORDER_TYPES.LOAD_START: return loadStart(state)
        case ORDER_TYPES.LOAD_END: return loadEnd(state)
        case ORDER_TYPES.PURCHASE_SUCCESS: return purchaseSuccess(state, action)
        case ORDER_TYPES.RESET_PURCHASED: return resetPurchased(state)
        case ORDER_TYPES.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case ORDER_TYPES.FETCH_ORDERS_FAILURE: return fetchOrdersFailure(state, action) 
        default: return state
    }
}

export default orderReducer