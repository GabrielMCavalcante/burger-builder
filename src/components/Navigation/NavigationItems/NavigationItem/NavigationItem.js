import React from 'react'
import { NavLink } from 'react-router-dom'

// CSS styles
import classes from './NavigationItem.css'

function NavigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                to={props.link} exact={props.exact}
                activeClassName={classes.active} 
            >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem