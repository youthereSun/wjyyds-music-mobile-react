import {Route,Routes,HashRouter as Router,Navigate} from 'react-router-dom'
import {lazy,Suspense} from 'react'
import Auth from "../utils/auth";
import Redirect from "../utils/redirect";
const Layout =lazy(()=>import('../views/layout'))
const Login = lazy(()=>import('../views/login'))
const NotFound=lazy(()=>import('../views/notFound'))

const AppRouter=()=>{
    return (
        <Router>
            <Routes>
                {/*<Route path={'/'} element={<Navigate to="/home" replace />}></Route>*/}
                <Route path={'/'} element={<Redirect to="/home"  />}></Route>
                <Route path={'/home/*'}  element={<Suspense fallback={<div>loading...</div>}>
                    <Auth>
                        <Layout/>
                    </Auth>
                </Suspense>} />
                <Route path={'/login'} element={<Suspense fallback={<div>loading...</div>}>
                    <Login/>
                </Suspense>} />
                <Route path={'*'} element={<Suspense fallback={<div>loading...</div>}>
                    <NotFound/>
                </Suspense>} />
            </Routes>
        </Router>
    )
}

export default AppRouter