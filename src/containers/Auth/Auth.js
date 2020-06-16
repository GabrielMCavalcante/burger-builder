import React, { Component } from 'react'

// Redux store connection
import { connect } from 'react-redux'

// Redux redirect
import { Redirect } from 'react-router-dom'

// Redux store actions
import actions from 'store/actions/auth'

// Controls config mounter
import mountConfig from './mountConfig'

// UI Components
import Input from 'components/UI/Input/Input'
import Button from 'components/UI/Button/Button'
import Spinner from 'components/UI/Spinner/Spinner'

// CSS styles
import styles from './Auth.css'

// Utility
import { updateObject, formValidation } from 'shared/utility'

class Auth extends Component {

    state = {
        controls: mountConfig(this),
        isValid: false,
        formFields: [],
        isSignup: false
    }

    inputChangedHandler(event, identifier) {
        const updatedControlsEl = updateObject(this.state.controls[identifier], {
            value: event.target.value,
            touched: true
        })

        updatedControlsEl.value = event.target.value
        updatedControlsEl.touched = true

        updatedControlsEl.validation.valid =
        formValidation.checkValidity(
                updatedControlsEl.value,
                updatedControlsEl.validation
            )

        const updatedControls = updateObject(this.state.controls, {
            [identifier]: updatedControlsEl
        })

        const formValidity = formValidation.checkFormValidity(updatedControls)

        this.setState({
            controls: updatedControls,
            isValid: formValidity
        })
    }

    componentDidMount() {
        if (this.props.redirectPath === '/auth')
            this.props.onRedirect('/home')

        const inputs = []
        const formFields = this.state.controls

        for (const field in formFields) {
            inputs.push(
                {
                    field,
                    type: formFields[field].type,
                    config: formFields[field].config,
                    children: formFields[field].children
                }
            )
        }

        this.setState({ formFields: inputs })
    }

    loginHandler(event) {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    switchAuthModeHandler() {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {

        let form = (
            <form onSubmit={this.loginHandler.bind(this)}>
                <h1>
                    {
                        this.state.isSignup
                            ? 'Register a new account'
                            : 'Login with an account'
                    }
                </h1>
                {
                    this.state.formFields.map(input => {
                        let invalid = false
                        if (this.state.controls[input.field].touched) {
                            if (!this.state.controls[input.field].validation.valid)
                                invalid = true
                        }
                        return <Input
                            key={input.field}
                            type={input.type}
                            children={input.children}
                            config={input.config}
                            invalid={invalid}
                        />
                    })
                }
                <Button
                    disabled={!this.state.isValid}
                    btnType='submit'
                    type='Success'
                >{this.state.isSignup ? 'SignUp' : 'SignIn'}</Button>
                <Button
                    click={this.switchAuthModeHandler.bind(this)}
                    type='Danger'
                >Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
            </form>
        )

        if (this.props.loading) form = <Spinner />

        let errorMessage = null

        if (this.props.error) {
            let errorType

            switch (this.props.error) {
                case 'EMAIL_EXISTS':
                    {
                        errorType = 'This email is already in use'
                        break
                    }
                case 'EMAIL_NOT_FOUND':
                case 'INVALID_PASSWORD':
                    {
                        errorType = 'The email or password is incorrect.'
                        break
                    }
                case 'USER_DISABLED':
                    {
                        errorType = 'This account is disabled.'
                        break
                    }
                default: 
                    errorType = 'Unknown error (maybe internet connection). Try Again.'
            }

            errorMessage = <p className={styles.Error}>{ errorType }</p> 
        }

        let redirect = null

        if (this.props.isAuthenticated)
            redirect = <Redirect to={this.props.redirectPath} />

        return (
            <div className={styles.Auth}>
                { redirect }
                { errorMessage }
                { form }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        redirectPath: state.auth.redirectPath
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAuth(email, password, isSignup) {
            dispatch(actions.auth(email, password, isSignup))
        },
        onRedirect(redirectPath) {
            dispatch(actions.redirect(redirectPath))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)