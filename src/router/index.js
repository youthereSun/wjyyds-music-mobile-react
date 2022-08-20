import {Route,Routes,BrowserRouter} from 'react-router-dom'
import {lazy,Suspense} from 'react'

const Home=lazy(()=>import('../views/home'))

const AppRouter=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Suspense fallback={<div>loading...</div>}>
                    <Home/>
                </Suspense>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter