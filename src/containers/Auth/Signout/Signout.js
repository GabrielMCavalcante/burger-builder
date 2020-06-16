import React, { Component } from 'react'

// React redirect
import { Redirect } from 'react-router-dom'

// React<->Redux connection
import { connect } from 'react-redux'

// Actions
import { actions } from 'store/actions/auth'

class Signout extends Component {
    componentDidMount() { this.props.onSignout() }
    
    render() { return <Redirect to="/auth"/> }
}

function mapStateToProps(dispatch) {
    return {
        onSignout() {
            dispatch(actions.signout())
        }
    }
}

export default connect(null, mapStateToProps)(Signout)