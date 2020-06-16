// Redux Saga effects
import { put } from 'redux-saga/effects'

// Actions
import { actions } from '../actions/burgerBuilder'

// Utility
import { setError } from 'shared/utility'

// Axios
import axios from 'axios-orders'

// Init initial ingredients fetched from api
export function* initIngredientsSaga() {
    try {
        const response = yield axios.get('/ingredients.json')

        yield put(actions.setIngredients(response.data))
    }
    catch (err) { yield put(setError({ ...err }.response.data.error.message)) }
}

// Init initial individual ingredient price fetched from api
export function* initIngredientPriceSaga() {
    try {
        const response = yield axios.get('/ingredient_price.json')

        yield put(actions.setIngredientPrice(response.data))
    }
    catch (err) { yield put(setError({ ...err }.response.data.error.message)) }
}

// Init initial minimal price fetched from api
export function* initBasePriceSaga() {
    try {
        const response = yield axios.get('/base_price.json')

        yield put(actions.setBasePrice(response.data))
    }
    catch (err) { yield put(setError({ ...err }.response.data.error.message)) }
}