import React from 'react'

// Redux connection
import { connect } from 'react-redux'

// CSS styles
import classes from './BuildControls.css'

// Components
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

function BuildControls(props) {

    let price = null

    if (props.showPrice)
        price = (
            <p>
                Price: <strong>{
                    new Intl.NumberFormat(
                        'en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(props.totPrice)
                }</strong>
            </p>
        )

    let finishButton = (
        <button
            disabled={props.order <= 0}
            className={classes.OrderButton}
            onClick={props.purchase}
        >Order now</button>
    )

    if (!props.isAuthenticated) {
        finishButton = (
            <button
                disabled={props.order <= 0}
                className={classes.OrderButton}
                onClick={props.signin}
            >Signin to order</button>
        )
    }

    return (
        <div className={classes.BuildControls}>
            {price}
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.added(control.type)}
                    removed={() => props.removed(control.type)}
                    disabled={props.disabled[control.type]}
                ></BuildControl>
            ))}
            {finishButton}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        totPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(BuildControls)