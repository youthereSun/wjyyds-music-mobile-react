import {Route, Routes, HashRouter as Router, Navigate} from 'react-router-dom'
import React, {lazy, Suspense} from 'react'
import Auth from "../utils/auth";
import Redirect from "../utils/redirect";
import lazyRoute from '../utils/lazyRoute'

const Layout = lazy(() => import('../views/layout'))
const Login = lazy(() => import('../views/login'))
const NotFound = lazy(() => import('../views/notFound'))

const Home = lazy(() => import('../views/home'))
const SearchResult = lazy(() => import('../views/searchResult'))
const AlbumDetail = lazy(() => import('../views/albumDetail'))

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<Navigate to="/home" replace />}></Route>
                {/*<Route path={'/'} element={<Redirect to="/home"/>}></Route>*/}
                <Route path={'/home'} element={<Suspense fallback={<>loading...</>}>
                    <Auth>
                        <Layout/>
                    </Auth>
                </Suspense>}>
                    {/*index 默认渲染*/}
                    <Route index element={<Navigate to={'personal'} />}/>
                    <Route path={'personal'} element={<Suspense fallback={<>loading...</>}>
                        <Home/>
                    </Suspense>}/>
                    {/*相对路径，省略父级，动态路由 多个参数：【search/:keyword/:id/:name】  */}
                    <Route path={'search/:keyword'} element={<Suspense fallback={<>loading...</>}>
                        <SearchResult/>
                    </Suspense>}/>
                    {/*绝对路径*/}
                    <Route path={'/home/detail/:id'} element={<Suspense fallback={<>loading...</>}>
                        <AlbumDetail/>
                    </Suspense>}/>
                </Route>
                <Route path={'/login'} element={<Suspense fallback={<>loading...</>}>
                    <Login/>
                </Suspense>}/>
                <Route path={'*'} element={<Suspense fallback={<>loading...</>}>
                    <NotFound/>
                </Suspense>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter