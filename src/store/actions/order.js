import { ORDER_TYPES } from './actionTypes'

export const actions = {

    purchaseStart(orderData, token) {
        return { type: ORDER_TYPES.PURCHASE_START, orderData, token }
    },

    purchaseSuccess(orderData) {
        return { type: ORDER_TYPES.PURCHASE_SUCCESS, orderData }
    },
    
    purchaseFailure(error) {
        return { type: ORDER_TYPES.PURCHASE_FAILURE, error }
    },

    fetchOrders(token, userToken) {
        return { type: ORDER_TYPES.FETCH_ORDERS_START, token, userToken }
    },
    
    fetchOrdersSuccess(orders) {
        return { type: ORDER_TYPES.FETCH_ORDERS_SUCCESS, orders }
    },
    
    fetchOrdersFailure(error) {
        return { type: ORDER_TYPES.FETCH_ORDERS_FAILURE, error }
    },
    
    loadStart() {
        return { type: ORDER_TYPES.LOAD_START }
    },
    
    loadEnd() {
        return { type: ORDER_TYPES.LOAD_END }
    }
}

export default {
    purchaseStart(orderData, token) {
        return function (dispatch) {
            dispatch(actions.purchaseStart(orderData, token))
        }
    },
    resetPurchased() {
        return function (dispatch) {
            dispatch({ type: ORDER_TYPES.RESET_PURCHASED })
        }
    },
    fetchOrders(token, userToken) {
        return function (dispatch) {
            dispatch(actions.fetchOrders(token, userToken))
        }
    }
}