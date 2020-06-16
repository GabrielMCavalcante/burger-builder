import React from 'react'

// CSS styles
import styles from './Order.css'

function Order(props) {

    const ingredients = []
    const totalPrice = new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD' }
    ).format(props.totalPrice)

    for (const ing in props.ingredients) {
        ingredients.push(
            <span key={ing}>{ing}: {props.ingredients[ing]}</span>
        )
    }

    return (
        <div className={styles.Order}>
            <p>Customer: {props.customer}</p>
            <p>Ingredients: {ingredients} </p>
            <p>Price: <strong>{totalPrice}</strong></p>
        </div>
    )
}

export default Order