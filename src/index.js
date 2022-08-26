import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import AppRouter from "./router";
import   { store, persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import './styles/common.css'
import 'antd/dist/antd.min.css'
import './styles/dark.less'
let root = createRoot(document.getElementById('root'))

root.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
)