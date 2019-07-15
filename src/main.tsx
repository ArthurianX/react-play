import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// @ts-ignore
import { Provider } from 'beautiful-react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { Router } from 'react-router';
import { App } from './app';

// Sagas initialization
import { sagaMiddleware } from './app/middleware/saga';
import myExportSaga from 'app/sagas/todos';

// prepare store
const history = createBrowserHistory();
const { store, persistor } = configureStore();

sagaMiddleware.run(myExportSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
