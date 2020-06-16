import React, { useEffect } from 'react'

// React redirect
import { Redirect } from 'react-router-dom'

// React<->Redux connection
import { connect } from 'react-redux'

// Actions
import { actions } from 'store/actions/auth'

function Signout(props) {
    useEffect(() => { props.onSignout() }, [])

    return <Redirect to="/auth" />
}

function mapStateToProps(dispatch) {
    return {
        onSignout() {
            dispatch(actions.signout())
        }
    }
}

export default connect(null, mapStateToProps)(Signout)