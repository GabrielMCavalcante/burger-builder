import React, { useState, Fragment } from 'react'

// React<->redux connection
import { connect } from 'react-redux'

// CSS styles
import classes from './Layout.css'

// Components
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

function Layout(props) {

    const [openSideDrawer, setOpenSideDrawer] = useState(false)

    function toggleDrawerHandler() {
        const toggledDrawer = !openSideDrawer
        setOpenSideDrawer(toggledDrawer)
    }

    return (
        <Fragment>
            <Toolbar 
                isAuthenticated={props.isAuthenticated} 
                openDrawer={toggleDrawerHandler}
            />
            
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                closeDrawer={toggleDrawerHandler}
                show={openSideDrawer}
            ></SideDrawer>
            <main className={classes.Content}>{props.children}</main>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)