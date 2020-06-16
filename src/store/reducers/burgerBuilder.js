// Actions
import { BURGERBUILDER_TYPES, STATUS_TYPES } from '../actions/actionTypes'

// Utility
import { updateObject } from 'shared/utility'

// Initial state values
const initialState = {
    ingredients: {},
    INGREDIENT_PRICE: {},
    totalPrice: 0,
    error: false
}

function setIngredients(state, action) {
    return updateObject(state, { ingredients: action.ingredients, error: false })
}

function setIngredientPrice(state, action) {
    return updateObject(state, { INGREDIENT_PRICE: action.prices, error: false })
}

function setBasePrice(state, action) {
    return updateObject(state, { totalPrice: action.price, error: false })
}

function updateIngredients(state, action) {
    return updateObject(state,
        { ingredients: action.updatedIngredients, error: false }
    )
}

function updatePrice(state, action) {
    return updateObject(state, { totalPrice: action.updatedPrice, error: false })
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

        case STATUS_TYPES.ERROR: 
            return error(state, action)
            
        default: 
            return state
    }
}

export default burgerBuilderReducer