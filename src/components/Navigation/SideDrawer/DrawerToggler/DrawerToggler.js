import React from 'react'

// CSS styles
import classes from './DrawerToggler.css'

function DrawerToggler(props) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggler