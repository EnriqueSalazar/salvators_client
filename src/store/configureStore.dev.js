import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

//import DevTools from '../containers/DevTools';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger({
  // predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN, // log all actions except AUTH_REMOVE_TOKEN
  level: {
    prevState: () => `info`,
    action: () => `log`,
    error: () => `error`,
    nextState: () => `info`,
  },
  duration: true,
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type),
  }),
  colors: {
    prevState: () => `#FFEB3B`,
    action: () => `red`,
    nextState: () => `#4CAF50`,
  },
  diff: true,
 // diffPredicate: (getState, action) => action.type === AUTH_SET_TOKEN,
});

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
    // compose(
      applyMiddleware(thunk, logger),
      // DevTools.instrument(),
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
