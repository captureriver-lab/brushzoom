import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import epics from './reducers/epics';
import createHistory from 'history/createBrowserHistory';

const _createStore = () => {

  const composeEnchensers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const epicMiddleware = createEpicMiddleware();

  const _store = createStore(
    reducers,
    composeEnchensers(
      applyMiddleware(epicMiddleware)
    ))
  epicMiddleware.run(epics)
  return _store
}


const store = _createStore()
const history = createHistory()

export { store, history }
