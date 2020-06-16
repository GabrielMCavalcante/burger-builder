import React, { Fragment } from 'react'

// React icons
import { FiLogIn, FiLogOut, FiHome, FiBookOpen } from 'react-icons/fi'

// Components
import NavigationItem from './NavigationItem/NavigationItem'

// CSS styles
import classes from './NavigationItems.css'

function NavigationItems(props) {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem
                link={'/home'}
            ><p>Burger Builder</p> <FiHome /></NavigationItem>
            {
                props.isAuthenticated
                    ? (
                        <Fragment>
                            <NavigationItem
                                link={'/orders'}
                            ><p>Orders</p> <FiBookOpen /></NavigationItem>

                            <NavigationItem
                                link={'/signout'}
                                exact
                            ><p>SignOut</p> <FiLogOut /></NavigationItem>
                        </Fragment>
                    )
                    : <NavigationItem link={'/auth'} exact>
                        <p>SignIn</p> <FiLogIn />
                    </NavigationItem>
            }
        </ul>
    )
}

export default NavigationItems