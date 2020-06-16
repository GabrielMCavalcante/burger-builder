import React, { Component } from 'react'
import classes from './Burger.css'

// Redux connection
import { connect } from 'react-redux'

// Components
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

class Burger extends Component {
    render() {
        const ingredients = Object.keys(this.props.ings).map(ingredient => {
            return [...Array(this.props.ings[ingredient])].map((_, i) =>
                <BurgerIngredient type={ingredient} key={Math.random()} />
            )
        }).reduce(
            (allIngredients, currentIngredient)=>allIngredients.concat(currentIngredient),
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
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Burger)