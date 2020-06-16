import React, { Component, Fragment } from 'react'

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

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        redirectToSignin: false
    }

    componentDidMount() {
        this.props.onRedirect("/home")
        this.props.onInitIngredientPrice()
        this.props.onInitBasePrice()
        this.props.onInitIngredients()

        setTimeout(() => {
            Object.keys(this.props.ings).forEach(ingredient =>
                this.updatePriceHandler(ingredient, 1, this.props.ings[ingredient])
            )
        }, 1000)
    }

    updatePriceHandler(ingredientName, fix, ingredientQtd = 1) {
        this.props.onUpdateTotalPrice(
            this.props.totPrice + (fix * (
                this.props.INGREDIENT_PRICE[ingredientName] * ingredientQtd
            ))
        )
    }

    addIngredientHandler(type) {
        const oldCount = this.props.ings[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = { ...this.props.ings }
        updatedIngredients[type] = updatedCount

        this.props.onUpdateIngredients(updatedIngredients)

        this.updatePriceHandler(type, 1)
    }

    removeIngredientHandler(type) {
        if (this.props.ings[type] > 0) {
            const oldCount = this.props.ings[type]

            const updatedCount = oldCount - 1

            const updatedIngredients = { ...this.props.ings }
            updatedIngredients[type] = updatedCount

            this.props.onUpdateIngredients(updatedIngredients)

            this.updatePriceHandler(type, -1)
        }
    }

    backdropClickHandler() {
        this.setState({ purchasing: false })
    }

    purchaseHandler() {
        this.setState({ purchasing: true })
    }

    calcTotIngredients() {
        return Object.values(this.props.ings).reduce((sum, val) => sum + val, 0)
    }

    redirectToSignin() {
        this.setState({ redirectToSignin: true })
        this.props.onRedirect("/checkout")
    }

    render() {
        
        const disabledInfo = { ...this.props.ings }

        for (const key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0

        let orderSummary = (
            <OrderSummary
                purchaseCanceled={this.backdropClickHandler.bind(this)}
            ></OrderSummary>
        )

        let burger = <Burger></Burger> 

        let buildControls = (
            <BuildControls
                isAuthenticated={this.props.isAuthenticated}
                added={this.addIngredientHandler.bind(this)}
                removed={this.removeIngredientHandler.bind(this)}
                disabled={disabledInfo}
                showPrice={this.props.totPrice !== 4}
                order={this.calcTotIngredients.bind(this)}
                signin={this.redirectToSignin.bind(this)}
                purchase={this.purchaseHandler.bind(this)}
            ></BuildControls>
        )

        if (this.state.loading)
            burger = <Spinner>Loading...</Spinner>

        if (!this.props.ings)
            orderSummary = burger = <Spinner>Loading...</Spinner>

        if (this.props.error) {
            burger = (
                <p style={{ textAlign: 'center' }}>
                    An error ocurred: <strong style={{ color: 'red' }}>
                        {this.props.error.message}
                    </strong> <br /> Try reloading the page.
                </p>
            )
            buildControls = null
        }

        return (
            <Fragment>
                { this.state.redirectToSignin && <Redirect to="/auth" /> }
                
                <Modal
                    loading={this.state.loading}
                    show={this.state.purchasing}
                    backdrop={this.backdropClickHandler.bind(this)}
                >{ orderSummary }</Modal>

                { burger }

                { buildControls }

            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        INGREDIENT_PRICE: state.burgerBuilder.INGREDIENT_PRICE,
        error: state.burgerBuilder.error,
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

        onRedirect(redirectPath) {
            dispatch(authActions.redirect(redirectPath))
        }
    }
}

export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
    axios
)