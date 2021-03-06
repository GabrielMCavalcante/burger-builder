import React, { Suspense, useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

// React<->Redux connection
import { connect } from 'react-redux'

// Actions
import actions from 'store/actions/auth'

// Components
import Layout from '../hoc/Layout/Layout'
import Auth from 'containers/Auth/Auth'
import Signout from 'containers/Auth/Signout/Signout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'

const Checkout = React.lazy(() => import('containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('containers/Orders/Orders'))

function App(props) {
  useEffect(() => props.onTryAutoSignin(), [])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/home" component={BurgerBuilder} />
      <Redirect to="/auth" />
    </Switch>
  )

  if (props.isAuth) {
    let redirect = null

    if (props.redirectPath !== "/home")
      redirect = <Redirect to={String(props.redirectPath)} />

    routes = (
      <Switch>
        <Route path="/home" component={BurgerBuilder} />

        <Route path="/signout" component={Signout} />

        <Route path="/orders" render={() =>
          <Suspense fallback={<p>Loading orders...</p>}> <Orders /> </Suspense>
        } />

        <Route path="/checkout" render={() =>
          <Suspense fallback={<p>Loading checkout page...</p>}> <Checkout /> </Suspense>
        } />

        {redirect}

        <Redirect to="/home" />
      </Switch>
    )
  }

  return (
    <Layout>{routes}</Layout>
  )

}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    redirectPath: state.auth.redirectPath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTryAutoSignin() {
      dispatch(actions.checkAuthState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)