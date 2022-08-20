import { legacy_createStore,combineReducers,applyMiddleware,compose } from 'redux'
import app_reducer from './app/reducer'
import reduxThunk from 'redux-thunk'
import  reduxPromise from 'redux-promise'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    //blacklist:['app_reducer'] //不进行持久化的reducer
    //whitelist:['app_reducer'] //进行持久化的reducer
}

//多仓库订阅
const  rootReducer =combineReducers( {app_reducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

//配置浏览器开发工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(persistedReducer,  composeEnhancers(applyMiddleware(reduxThunk,reduxPromise )))

let persistor = persistStore(store)
export  { store, persistor }