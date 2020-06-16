import React from 'react'

// CSS styles
import classes from './Button.css'

function Button(props) {
    return <button
                disabled={props.disabled}
                type={props.btnType || 'button'}
                onClick={props.click} 
                className={[classes.Button, classes[props.type]].join(' ')}
            >{props.children}</button>
}

export default Button