import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger, sagaMiddleware } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import { persistStore, persistReducer, PersistorState, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function configureStore(initialState?: RootState): { store: Store<PersistorState>; persistor: Persistor} {
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }


  // const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;
  const store = createStore(persistedReducer, initialState as any, middleware) as unknown as Store<PersistorState>;
  let persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  // return store;
  return { store, persistor };
}
