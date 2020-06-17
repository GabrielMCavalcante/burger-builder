// Action types
import { BURGERBUILDER_TYPES } from './actionTypes'

export const actions = {

    initIngredients() {
        return { type: BURGERBUILDER_TYPES.INIT_INGREDIENTS }
    },

    initIngredientPrice() {
        return { type: BURGERBUILDER_TYPES.INIT_INGREDIENTS_PRICE }
    },

    initBasePrice() {
        return { type: BURGERBUILDER_TYPES.INIT_BASE_PRICE }
    },

    setIngredients(ingredients) {
        return { type: BURGERBUILDER_TYPES.SET_INGREDIENTS, ingredients }
    },
    
    setIngredientPrice(prices) {
        return { type: BURGERBUILDER_TYPES.SET_INGREDIENT_PRICE, prices }
    },
    
    setBasePrice(price) {
        return { type: BURGERBUILDER_TYPES.SET_BASE_PRICE, price }
    },

    updateIngredients(updatedIngredients) {
        return {
            type: BURGERBUILDER_TYPES.UPDATE_INGREDIENTS,
            updatedIngredients
        }
    },

    updateTotalPrice(updatedPrice) {
        return {
            type: BURGERBUILDER_TYPES.UPDATE_PRICE,
            updatedPrice
        }
    },

    resetInitializedValues() {
        return {type: BURGERBUILDER_TYPES.RESET_INITIALIZEDVALUES}
    }
}

export default {
    initIngredients() {
        return function(dispatch) {
            dispatch(actions.initIngredients())
        }
    },

    initIngredientPrice() {
        return function(dispatch) {
            dispatch(actions.initIngredientPrice())
        }
    },

    initBasePrice() {
        return function(dispatch) {
            dispatch(actions.initBasePrice())
        }
    },

    updateIngredients(updatedIngredients) {
        return function(dispatch) {
            dispatch(actions.updateIngredients(updatedIngredients))
        }
    },

    updateTotalPrice(updatedPrice) {
        return function(dispatch) {
            dispatch(actions.updateTotalPrice(updatedPrice))
        }
    },

    resetInitializedValues() {
        return function(dispatch) {
            dispatch(actions.resetInitializedValues())
        }
    }
}