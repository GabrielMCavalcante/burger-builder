import React from 'react'

// Logo
import BurgerLogo from 'assets/images/burger-logo.png'

// CSS styles
import classes from './Logo.css'

function Logo(props) {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={BurgerLogo} alt='Burger Builder Logo'/>
        </div>
    )
}

export default Logo