import React from 'react'
import ReactDOM from 'react-dom'

// Router
import { BrowserRouter } from 'react-router-dom'

// Redux
import { 
    createStore, 
    applyMiddleware, 
    compose, 
    combineReducers 
} from 'redux'

// Redux Saga Middleware
import createSagaMiddleware from 'redux-saga'

// Redux sagas
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas'

// Store reducer
import burgerBuilderReducer from 'store/reducers/burgerBuilder'
import orderReducer from 'store/reducers/order'
import authReducer from 'store/reducers/auth'

// Redux Provider
import { Provider } from 'react-redux'

// Redux Thunk
import thunk from 'redux-thunk'

//CSS styles
import './index.css'

// Components
import App from './containers/App'

// Webpack service worker
import registerServiceWorker from './registerServiceWorker'

// Redux DevTools global constant
const composeEnhancers = (process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : null 
) || compose

// Combining reducers into one
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

// Store instance
const store = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk, sagaMiddleware)
    )
)

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()