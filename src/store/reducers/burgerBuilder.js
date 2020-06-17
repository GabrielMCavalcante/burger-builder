// Actions
import { BURGERBUILDER_TYPES, STATUS_TYPES } from '../actions/actionTypes'

// Utility
import { updateObject } from 'shared/utility'

// Initial state values
const initialState = {
    ingredients: {},
    INGREDIENT_PRICE: {},
    totalPrice: 0,
    error: false,
    initializedValues: {
        ingredients: false,
        INGREDIENT_PRICE: false,
        totalPrice: false
    }
}

function setIngredients(state, action) {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        initializedValues: { ...state.initializedValues, ingredients: true }
    })
}

function setIngredientPrice(state, action) {
    return updateObject(state, {
        INGREDIENT_PRICE: action.prices,
        error: false,
        initializedValues: { ...state.initializedValues, INGREDIENT_PRICE: true }
    })
}

function setBasePrice(state, action) {
    return updateObject(state, {
        totalPrice: action.price,
        error: false,
        initializedValues: { ...state.initializedValues, totalPrice: true }
    })
}

function updateIngredients(state, action) {
    return updateObject(state,
        { ingredients: action.updatedIngredients, error: false }
    )
}

function updatePrice(state, action) {
    // console.log('INSIDE REDUCER: ', action)
    return updateObject(state, { totalPrice: action.updatedPrice, error: false })
}

function resetInitializedValues(state) {
    return updateObject(state, {
        initializedValues: {
            ingredients: false,
            INGREDIENT_PRICE: false,
            totalPrice: false
        }
    })
}

function error(state, action) {
    return updateObject(state, { error: action.error })
}

// Reducer function
function burgerBuilderReducer(state = initialState, action) {
    switch (action.type) {
        case BURGERBUILDER_TYPES.SET_INGREDIENTS:
            return setIngredients(state, action)

        case BURGERBUILDER_TYPES.SET_INGREDIENT_PRICE:
            return setIngredientPrice(state, action)

        case BURGERBUILDER_TYPES.SET_BASE_PRICE:
            return setBasePrice(state, action)

        case BURGERBUILDER_TYPES.UPDATE_INGREDIENTS:
            return updateIngredients(state, action)

        case BURGERBUILDER_TYPES.UPDATE_PRICE:
            return updatePrice(state, action)

        case BURGERBUILDER_TYPES.RESET_INITIALIZEDVALUES:
            return resetInitializedValues(state)

        case STATUS_TYPES.ERROR:
            return error(state, action)

        default:
            return state
    }
}

export default burgerBuilderReducer