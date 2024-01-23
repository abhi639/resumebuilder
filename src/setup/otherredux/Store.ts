import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {reduxBatch} from '@manaflair/redux-batch'
import {persistStore} from 'redux-persist'
import {rootReducer, rootSaga} from './RootReducer'
import api from '../../middleware/api'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware()


const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  thunk:true

  }).concat(sagaMiddleware,api),
]

const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: 0,
  blacklist: [
    'login',
    'getQuestionaire',
    'getStates',
    'getOrders',
    'getProduct',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

export type AppDispatch = typeof store.dispatch

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
