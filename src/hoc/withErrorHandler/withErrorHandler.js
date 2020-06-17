import React, { useState, useEffect, Fragment } from 'react'

// Components
import Modal from 'components/UI/Modal/Modal'

function withErrorHandler(WrappedComponent, axios) {
    return function (props) {

        const [error, setError] = useState(null)

        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null)
            return request
        })

        const resInterceptor = axios.interceptors.response.use(
            response => response,
            err => setError(err)
        )

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        }, [reqInterceptor, resInterceptor])

        let errorMessage = null
        if (error) {
            switch (error.response.data.error) {
                case 'Permission denied':
                case 'Could not parse auth token.':
                    {
                        errorMessage = 'Only authenticated users can access this feature.'
                        break
                    }
                default: errorMessage = 'An unknown error occured.'
            }
        }

        return (
            <Fragment>
                <Modal
                    show={error}
                    backdrop={() => setError(null)}
                >{error ? errorMessage : null}</Modal>
                <WrappedComponent {...props}></WrappedComponent>
            </Fragment>
        )
    }
}

export default withErrorHandler