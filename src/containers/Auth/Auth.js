import React, { useEffect, useState, useReducer } from 'react'

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

function controlsReducer(currentControls, action) {
    
    function update(cControls, updated) {
        return { ...cControls, [updated.config.name]: updated }
    }

    switch(action.type) {
        case 'UPDATE': return update({...currentControls}, action.updatedControls)
        default: throw new Error('Unknown action type: ' + action.type)
    }
}

function Auth(props) {

    const [controls, dispatchControls] = useReducer(
        controlsReducer,
        mountConfig(inputChangedHandler)
    )
    
    const [isValid, setIsValid] = useState(false)
    const [formFields, setFormFields] = useState([])
    const [isSignup, setIsSignup] = useState(false)

    function inputChangedHandler(event, identifier) {
        const updatedControlsEl = updateObject(controls[identifier], {
            value: event.target.value,
            touched: true
        })

        updatedControlsEl.validation.valid =
            formValidation.checkValidity(
                updatedControlsEl.value,
                updatedControlsEl.validation
            )

        const updatedControls = updateObject(controls, {
            [identifier]: updatedControlsEl
        })

        const formValidity = formValidation.checkFormValidity(updatedControls)
        
        dispatchControls({type: 'UPDATE', updatedControls: updatedControls[identifier]})
        setIsValid(formValidity)
    }

    useEffect(() => {
        if (props.redirectPath === '/auth')
            props.onRedirect('/home')

        const inputs = []
        const formFields = controls

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
        setFormFields(inputs)
    }, [])

    function loginHandler(event) {
        event.preventDefault()
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup
        )
    }

    let form = (
        <form onSubmit={loginHandler}>
            <h1>
                {
                    isSignup
                        ? 'Register a new account'
                        : 'Login with an account'
                }
            </h1>
            {
                formFields.map(input => {
                    let invalid = false
                    if (controls[input.field].touched) {
                        if (!controls[input.field].validation.valid)
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
                disabled={!isValid}
                btnType='submit'
                type='Success'
            >{isSignup ? 'SignUp' : 'SignIn'}</Button>
            <Button
                click={() => setIsSignup(!isSignup)}
                type='Danger'
            >Switch to {isSignup ? 'SignIn' : 'SignUp'}</Button>
        </form>
    )

    if (props.loading) form = <Spinner />

    let errorMessage = null

    if (props.error) {
        let errorType

        switch (props.error) {
            case 'EMAIL_EXISTS':
                {
                    errorType = 'This email is already in use'
                    break
                }
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_EMAIL':
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

        errorMessage = <p className={styles.Error}>{errorType}</p>
    }

    let redirect = null

    if (props.isAuthenticated)
        redirect = <Redirect to={props.redirectPath} />

    return (
        <div className={styles.Auth}>
            {redirect}
            {errorMessage}
            {form}
        </div>
    )

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