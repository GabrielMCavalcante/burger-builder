import React, { Component } from 'react'

// React router
import { Route, Redirect, withRouter } from 'react-router-dom'

// Redux connection
import { connect } from 'react-redux'

import actions from 'store/actions/auth'

// Components
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from 'containers/Checkout/ContactData/ContactData'

class Checkout extends Component {

    componentDidMount() { this.props.onRedirect("/home") }

    checkoutCanceledHandler() {
        this.props.history.goBack()
    }

    checkoutContinuedHandler() {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let checkoutContent = (
            <div>
                <CheckoutSummary 
                    canceled={this.checkoutCanceledHandler.bind(this)}
                    continued={this.checkoutContinuedHandler.bind(this)}
                ></CheckoutSummary>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        )

        if(Object.keys(this.props.ings).length === 0) 
            checkoutContent = <Redirect to='/' />

        return checkoutContent
    }
}

function mapStateToProps(state) {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRedirect(redirectPath) {
            dispatch(actions.redirect(redirectPath))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))