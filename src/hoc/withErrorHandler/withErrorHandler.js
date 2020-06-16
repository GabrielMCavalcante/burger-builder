import React, { Component, Fragment } from 'react'

// Components
import Modal from 'components/UI/Modal/Modal'

function withErrorHandler(WrappedComponent, axios) {
    return class extends Component {

        constructor(props) {
            super(props)
            
            this.state = {
                error: null
            }
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request
            })

            this.resInterceptor = axios.interceptors.response.use(
                response => response, 
                err => this.setState({ error: err })
            )
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler() {
            this.setState({ error: null })
        }

        render() {
            
            let errorMessage = null
            if(this.state.error) {
                switch(this.state.error.response.data.error) {
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
                        show={this.state.error} 
                        backdrop={this.errorConfirmedHandler.bind(this)}
                    >{this.state.error ? errorMessage : null}</Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Fragment>
            )
        }
    }
}

export default withErrorHandler