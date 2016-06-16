import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { selectedPaid, fetchPosts } from '../actions/actions'
import rootReducer from '../reducers/reducers'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'


// Sync dispatched route actions to the history
export const reduxRouterMiddleware = routerMiddleware(browserHistory)

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
    	applyMiddleware(
	      thunkMiddleware,
	      reduxRouterMiddleware
	      //loggerMiddleware
	    ),
	    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
// store.dispatch(selectedPaid('paid'))
// store.dispatch(fetchPosts('paid')).then(() =>
//   console.log(store.getState())
// )

