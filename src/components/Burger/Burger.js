import React from 'react'
import classes from './Burger.css'

// Redux connection
import { connect } from 'react-redux'

// Components
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

function Burger(props) {
    const ingredients = Object.keys(props.ings).map(ingredient => {
        return [...Array(props.ings[ingredient])].map(() =>
            <BurgerIngredient type={ingredient} key={Math.random()} />
        )
    }).reduce(
        (allIngredients, currentIngredient) => allIngredients.concat(currentIngredient),
        []
    )
    return (
        <div className={classes.Burguer}>
            <BurgerIngredient type='bread-top' />
            {ingredients.length > 0 ? ingredients : <p>Start adding ingredients!</p>}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Burger)