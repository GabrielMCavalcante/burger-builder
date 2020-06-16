import React, { Component } from 'react'

// React router
import { Redirect } from 'react-router-dom'

// Store connection
import { connect } from 'react-redux'

// Store actions
import actions from 'store/actions/order'

// Form configuration
import mountConfig from './orderFormConfig'

// UI Components
import Spinner from 'components/UI/Spinner/Spinner'
import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'

// Higher Order Components
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

// CSS styles
import styles from './ContactData.css'

// Axios instance
import axios from 'axios-orders'

// Utility
import { updateObject, formValidation } from 'shared/utility'

class ContactData extends Component {

    state = {
        orderForm: mountConfig(this),
        formInputs: [],
        isValid: false,
        finalPrice: 0
    }

    inputChangedHandler(event, identifier) {
        const updatedOrderFormEl = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            touched: true
        })

        updatedOrderFormEl.validation.valid =
        formValidation.checkValidity(
                updatedOrderFormEl.value,
                updatedOrderFormEl.validation
            )

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [identifier]: updatedOrderFormEl
        })

        const formValidity = formValidation.checkFormValidity(updatedOrderForm)

        let updatedFinalPrice = this.state.finalPrice

        if (identifier === 'deliveryMethod') {
            if (event.target.value === 'express')
                updatedFinalPrice *= 1.1
            else if (event.target.value === 'normal')
                updatedFinalPrice /= 1.1
        }

        this.setState({
            orderForm: updatedOrderForm,
            isValid: formValidity,
            finalPrice: updatedFinalPrice
        })
    }

    componentDidMount() {
        const inputs = []
        const formFields = this.state.orderForm

        this.setState({ finalPrice: this.props.totPrice })

        for (const field in formFields) {
            inputs.push(
                {
                    field,
                    type: formFields[field].type,
                    config: formFields[field].config,
                    children: formFields[field].children
                }
            )
        }

        this.setState({ formInputs: inputs })
    }

    submitOrderHandler(event) {
        event.preventDefault()

        const newOrder = {
            ingredients: this.props.ings,
            price: parseFloat(this.state.finalPrice.toFixed(2)),
            customer: {
                name: this.state.orderForm.name.value,
                street: this.state.orderForm.street.value,
                zipCode: this.state.orderForm.zipCode.value,
                country: this.state.orderForm.country.value,
                email: this.state.orderForm.email.value
            },
            userToken: this.props.userToken,
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        }

        this.props.onOrderBurger(newOrder, this.props.token)
    }

    render() {
        let form = (
            <form onSubmit={e => this.submitOrderHandler(e)}>
                {this.state.formInputs.map(input => {
                    let invalid = false
                    if (this.state.orderForm[input.field].touched) {
                        if (!this.state.orderForm[input.field].validation.valid)
                            invalid = true
                    }
                    return <Input
                        key={input.field}
                        type={input.type}
                        children={input.children}
                        config={input.config}
                        invalid={invalid}
                    />
                })}
                <p>Final Price: <strong>{new Intl.NumberFormat(
                    'en-US', { style: 'currency', currency: 'USD' }
                ).format(this.state.finalPrice)}</strong>
                </p>
                <Button
                    disabled={!this.state.isValid}
                    btnType='submit'
                    type='Success'
                >Order</Button>
            </form>
        )

        if (this.props.loading) form = <Spinner></Spinner>

        if (this.props.purchased) {
            this.props.onResetPurchased()
            form = <Redirect to='/' />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userToken: state.auth.userToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onOrderBurger(orderData, token) {
            dispatch(actions.purchaseStart(orderData, token))
        },
        onResetPurchased() { dispatch(actions.resetPurchased()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(ContactData, axios)
)