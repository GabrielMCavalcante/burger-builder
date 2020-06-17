import React, { useEffect } from 'react'

// React router
import { Route, Redirect, withRouter } from 'react-router-dom'

// Redux connection
import { connect } from 'react-redux'

import actions from 'store/actions/auth'

// Components
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from 'containers/Checkout/ContactData/ContactData'

function Checkout(props) {

    useEffect(() => props.onRedirect("/home"), [])

    let checkoutContent = (
        <div>
            <CheckoutSummary
                canceled={() => props.history.goBack()}
                continued={() => props.history.replace('/checkout/contact-data')}
            ></CheckoutSummary>
            <Route
                path={props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>
    )

    if (Object.keys(props.ings).length === 0)
        checkoutContent = <Redirect to='/' />

    return checkoutContent
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