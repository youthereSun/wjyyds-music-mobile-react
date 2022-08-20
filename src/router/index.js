import {Route,Routes,BrowserRouter,Navigate} from 'react-router-dom'
import {lazy,Suspense} from 'react'

const Layout =lazy(()=>import('../views/layout'))
const Login = lazy(()=>import('../views/login'))

const AppRouter=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Navigate to="/home"/>}></Route>
                <Route path={'/home/*'}  element={<Suspense fallback={<div>loading...</div>}>
                    <Layout/>
                </Suspense>} />
                <Route path={'/login'} element={<Suspense fallback={<div>loading...</div>}>
                    <Login/>
                </Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter