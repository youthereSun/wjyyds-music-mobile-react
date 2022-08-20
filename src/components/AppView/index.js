import React,{lazy,Suspense} from 'react';
import {Route,Routes} from 'react-router-dom'
import style from './style.module.less'

const Home=lazy(()=>import('../../views/home'))
const SearchResult =lazy(()=>import('../../views/searchResult'))
const AlbumDetail =lazy(()=>import('../../views/albumDetail'))
const Index = () => {
    //home下的路由嵌套
    const ChildRoutes=()=>(
        <Routes>
            <Route path={'/'}  element={<Suspense fallback={<div>loading...</div>}>
                <Home/>
            </Suspense>} />
            <Route path={'/search/:keyword'}  element={<Suspense fallback={<div>loading...</div>}>
                <SearchResult/>
            </Suspense>} />
            <Route path={'/detail/:id'}  element={<Suspense fallback={<div>loading...</div>}>
                <AlbumDetail/>
            </Suspense>} />
        </Routes>
    )

    return (
        <div className={style.app_view} >
            <ChildRoutes />
        </div>
    );
};

export default Index;




