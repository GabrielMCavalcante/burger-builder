import React, { Component, Fragment } from 'react'

// CSS styles
import classes from './Modal.css'

// Components
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        const [transform, opacity] = this.props.show
            ? ['translateY(0)', '1']
            : ['translateY(-100vh)', '0']
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.backdrop}></Backdrop>
                <div style={{ transform, opacity }} className={classes.Modal}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal