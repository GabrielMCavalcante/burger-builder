import React, { Fragment } from 'react'

// CSS styles
import classes from './Modal.css'

// Components
import Backdrop from '../Backdrop/Backdrop'

function Modal(props) {
    console.log('[MODAL]')
    const [transform, opacity] = props.show
        ? ['translateY(0)', '1']
        : ['translateY(-100vh)', '0']
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.backdrop}></Backdrop>
            <div style={{ transform, opacity }} className={classes.Modal}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default React.memo(Modal, ((prevProps, nextProps) => {
    return (
        prevProps.show === nextProps.show ||
        prevProps.children === nextProps.children
    )
}))