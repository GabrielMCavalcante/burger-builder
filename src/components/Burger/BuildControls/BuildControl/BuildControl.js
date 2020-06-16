import React from 'react'

// CSS styles
import classes from './BuildControl.css'

function BuildControl(props) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                disabled={props.disabled} 
                onClick={props.removed} 
                className={classes.Less}
            >Less</button>
            <button 
                onClick={props.added} 
                className={classes.More}
            >More</button>
        </div>
    );
}

export default BuildControl