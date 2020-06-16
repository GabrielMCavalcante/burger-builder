import React from 'react'

// CSS styles
import classes from './Backdrop.css'

function Backdrop(props) {
    return props.show 
        ? <div onClick={props.clicked} className={classes.Backdrop}></div> 
        : null
}

export default Backdrop