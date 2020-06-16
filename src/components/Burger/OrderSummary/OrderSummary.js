import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

// Redux connection
import { connect } from 'react-redux'

// CSS styles
import styles from './OrderSummary.css'

// UI components
import Button from '../../UI/Button/Button'

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ings)
        .map(igKey =>
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {igKey}
                </span>: {props.ings[igKey]}
            </li>
        )

    const formattedTotalPrice = new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD' }
    ).format(props.totPrice)

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul> { ingredientSummary } </ul>
            <p> <strong>Total price: { formattedTotalPrice }</strong> </p>
            <p>Continue to Checkout?</p>

            <Button click={props.purchaseCanceled} type='Danger'>Cancel</Button>

            <Button type='Success'>
                <NavLink className={styles.Link} to='/checkout'>Continue</NavLink>
            </Button>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(OrderSummary)