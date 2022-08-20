import {createRoot} from 'react-dom/client'
import AppLayout from './views/layout'
import {Provider} from 'react-redux'
import   { store, persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import './styles/common.css'

let root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <AppLayout />
        </PersistGate>
    </Provider>
)