import React, { useEffect, useState, useReducer } from 'react'

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

function orderFormReducer(currentOrderForm, action) {
    function update(cOrderForm, updated) {
        return { ...cOrderForm, [updated.config.name]: updated }
    }

    switch (action.type) {
        case 'UPDATE': return update({ ...currentOrderForm }, action.updatedOrderForm)
        default: throw new Error('Unknown action type: ' + action.type)
    }
}

function ContactData(props) {

    const [orderForm, dispatchOrderForm] = useReducer(
        orderFormReducer,
        mountConfig(inputChangedHandler)
    )

    const [formInputs, setFormInputs] = useState([])
    const [isValid, setIsValid] = useState(false)
    const [finalPrice, setFinalPrice] = useState(0)

    function inputChangedHandler(event, identifier) {
        const updatedOrderFormEl = updateObject(orderForm[identifier], {
            value: event.target.value,
            touched: true
        })

        updatedOrderFormEl.validation.valid =
            formValidation.checkValidity(
                updatedOrderFormEl.value,
                updatedOrderFormEl.validation
            )

        const updatedOrderForm = updateObject(orderForm, {
            [identifier]: updatedOrderFormEl
        })

        const formValidity = formValidation.checkFormValidity(updatedOrderForm)

        if (identifier === 'deliveryMethod') {
            let updatedFinalPrice
            if (event.target.value === 'express')
                updatedFinalPrice = props.tenPercPrice
            else if (event.target.value === 'normal')
                updatedFinalPrice = props.totPrice
            setFinalPrice(updatedFinalPrice)
        }

        dispatchOrderForm({ 
            type: 'UPDATE', 
            updatedOrderForm: updatedOrderForm[identifier] 
        })
        
        setIsValid(formValidity)
    }

    useEffect(() => {
        const inputs = []
        const formFields = orderForm

        setFinalPrice(props.totPrice)

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

        setFormInputs(inputs)
    }, [])

    function submitOrderHandler(event) {
        event.preventDefault()

        const newOrder = {
            ingredients: props.ings,
            price: parseFloat(finalPrice.toFixed(2)),
            customer: {
                name: orderForm.name.value,
                street: orderForm.street.value,
                zipCode: orderForm.zipCode.value,
                country: orderForm.country.value,
                email: orderForm.email.value
            },
            userToken: props.userToken,
            deliveryMethod: orderForm.deliveryMethod.value
        }

        props.onOrderBurger(newOrder, props.token)
    }

    let form = (
        <form onSubmit={e => submitOrderHandler(e)}>
            {formInputs.map(input => {
                let invalid = false
                if (orderForm[input.field].touched) {
                    if (!orderForm[input.field].validation.valid)
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
            ).format(finalPrice)}</strong>
            </p>
            <Button
                disabled={!isValid}
                btnType='submit'
                type='Success'
            >Order</Button>
        </form>
    )

    if (props.loading) form = <Spinner></Spinner>

    if (props.purchased) {
        props.onResetPurchased()
        form = <Redirect to='/' />
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        tenPercPrice: state.burgerBuilder.tenPercPrice,
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