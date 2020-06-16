import React from 'react'

// CSS styles
import classes from './Input.css'

function Input(props) {

    let input = null
    let invalid = props.invalid ? classes.Invalid : null
    const label = <label htmlFor={props.config.name}>{props.config.label}</label>
    switch (props.type) {
        case 'input':
            {
                input = <input 
                    className={invalid} 
                    {...props.config} 
                    value={props.value}
                />
                break
            }
        case 'select':
            {
                input = <select
                     {...props.config} 
                     value={props.value}
                >{props.children}</select>
                break
            }
        case 'textarea':
            {
                input = <textarea 
                    className={invalid} 
                    {...props.config} 
                    value={props.value}
                />
                break
            }
        default:
            {
                input = <input 
                    className={invalid} 
                    {...props.config} 
                    value={props.value}
                />
            }
    }

    return (
        <div className={classes.Input}>
            { label } { input }
        </div>
    )
}

export default Input