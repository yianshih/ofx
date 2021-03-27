import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, sagaMiddleware]

const composeEnhancers =
  //@ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        trace: true
      })
    : compose

const store = createStore(
  combineReducers({
    ...reducers
  }),
  composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga)

export default store
