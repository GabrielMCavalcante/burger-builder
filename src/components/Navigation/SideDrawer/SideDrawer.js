import React, { Fragment } from 'react'

// CSS styles
import classes from './SideDrawer.css'

// Logo
import Logo from 'components/Logo/Logo'

// Components
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

function SideDrawer(props) {
    const drawerClasses = [classes.SideDrawer]
    if (props.show) drawerClasses.push(classes.Open)
    else drawerClasses.push(classes.Close)
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closeDrawer} />
            <div className={drawerClasses.join(' ')} onClick={props.closeDrawer}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated} 
                    />
                </nav>
            </div>
        </Fragment>
    )
}

export default SideDrawer