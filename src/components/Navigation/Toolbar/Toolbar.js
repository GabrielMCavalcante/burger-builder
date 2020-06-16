import React from 'react'

// CSS styles
import classes from './Toolbar.css'

// Components
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'

function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggler clicked={props.openDrawer} />
            <Logo height="80%" />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    )
}

export default Toolbar