import React, { Component } from 'react'

// Redux connection
import { connect } from 'react-redux'

// Redux actions
import actions from 'store/actions/order'

// Components
import Order from 'components/Order/Order'

// UI components
import Spinner from 'components/UI/Spinner/Spinner'

// hoc Components
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'

// Axios
import axios from 'axios-orders'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userToken)
    }

    render() {
        let orders 
        
        if(this.props.error) orders = <p>{this.props.error}</p>
        else orders = this.props.orders.map(order => (
            <Order
                key={order.id}
                customer={order.customerName}
                totalPrice={order.totalPrice}
                ingredients={order.ingredients}
            ></Order>
        ))
        
        return this.props.loading ? <Spinner></Spinner> : orders
    }
}

function mapStateToProps(state) {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userToken: state.auth.userToken,
        error: state.order.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFetchOrders(token, userToken) {
            dispatch(actions.fetchOrders(token, userToken))
        }
    }
}

export default withErrorHandler(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Orders), axios
)
