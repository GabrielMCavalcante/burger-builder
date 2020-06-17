import React, { useEffect, useState, Fragment } from 'react'

// React redirect
import { Redirect } from 'react-router-dom'

// Store actions
import actions from 'store/actions/burgerBuilder'
import authActions from 'store/actions/auth'

// Redux connection
import { connect } from 'react-redux'

// Higher order components
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

// Components
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'

// UI components
import Spinner from 'components/UI/Spinner/Spinner'

// Axios instance
import axios from 'axios-orders'

let oldPrice = 0
export function BurgerBuilder(props) {
    
    const [purchasing, setPurchasing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [valid, setValid] = useState(false)

    useEffect(() => {
        setLoading(true)
        setValid(false)
        oldPrice = 0
        props.onResetInitializedValues()
        props.onRedirect("/home")
        props.onInitIngredientPrice()
        props.onInitBasePrice()
        props.onInitIngredients()
    }, [])

    useEffect(() => {
        const iniValues = Object.keys(props.initializedValues)
        let valid = true
        iniValues.forEach(value => {
            if (valid)
                valid = props.initializedValues[value]
        })
        if (valid) {
            setValid(true)
            setLoading(false)
            oldPrice = props.totalPrice
            Object.keys(props.ings).forEach(ingredient => {
                updatePriceHandler(ingredient, 1, props.ings[ingredient])
            })
        }
    }, [props.initializedValues])

    function updatePriceHandler(ingredientName, fix, ingredientQtd = 1) {
        oldPrice = oldPrice + (fix * (
            props.INGREDIENT_PRICE[ingredientName] * ingredientQtd
        ))
        props.onUpdateTotalPrice(oldPrice)
    }

    function addIngredientHandler(type) {
        const oldCount = props.ings[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = { ...props.ings }
        updatedIngredients[type] = updatedCount

        props.onUpdateIngredients(updatedIngredients)

        updatePriceHandler(type, 1)
    }

    function removeIngredientHandler(type) {
        if (props.ings[type] > 0) {
            const oldCount = props.ings[type]

            const updatedCount = oldCount - 1

            const updatedIngredients = { ...props.ings }
            updatedIngredients[type] = updatedCount

            props.onUpdateIngredients(updatedIngredients)

            updatePriceHandler(type, -1)
        }
    }

    function calcTotIngredients() {
        return Object.values(props.ings).reduce((sum, val) => sum + val, 0)
    }

    function onRedirectToSignin() {
        setRedirectToSignin(true)
        props.onRedirect("/checkout")
    }

    const disabledInfo = { ...props.ings }

    for (const key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0

    let orderSummary = (
        <OrderSummary
            purchaseCanceled={() => setPurchasing(false)}
        ></OrderSummary>
    )

    let burger = <Burger></Burger>

    let buildControls = (
        <BuildControls
            isAuthenticated={props.isAuthenticated}
            added={addIngredientHandler}
            removed={removeIngredientHandler}
            disabled={disabledInfo}
            showPrice={valid}
            order={calcTotIngredients}
            signin={onRedirectToSignin}
            purchase={() => setPurchasing(true)}
        ></BuildControls>
    )

    if (loading)
        burger = <Spinner>Loading...</Spinner>

    if (!props.ings)
        orderSummary = burger = <Spinner>Loading...</Spinner>

    if (props.error) {
        burger = (
            <p style={{ textAlign: 'center' }}>
                An error ocurred: <strong style={{ color: 'red' }}>
                    {props.error.message}
                </strong> <br /> Try reloading the page.
            </p>
        )
        buildControls = null
    }

    return (
        <Fragment>
            { redirectToSignin && <Redirect to="/auth" /> }

            <Modal
                show={purchasing}
                backdrop={() => setPurchasing(false)}
            >{ orderSummary }</Modal>

            { burger }

            { buildControls }

        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        INGREDIENT_PRICE: state.burgerBuilder.INGREDIENT_PRICE,
        error: state.burgerBuilder.error,
        initializedValues: state.burgerBuilder.initializedValues,
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInitIngredients() { dispatch(actions.initIngredients()) },

        onInitIngredientPrice() { dispatch(actions.initIngredientPrice()) },

        onInitBasePrice() { dispatch(actions.initBasePrice()) },

        onUpdateIngredients(updatedIngredients) {
            dispatch(actions.updateIngredients(updatedIngredients))
        },

        onUpdateTotalPrice(updatedPrice) {
            dispatch(actions.updateTotalPrice(updatedPrice))
        },

        onResetInitializedValues() {
            dispatch(actions.resetInitializedValues())
        },

        onRedirect(redirectPath) {
            dispatch(authActions.redirect(redirectPath))
        }
    }
}

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
    axios
)