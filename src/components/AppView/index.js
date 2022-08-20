import React,{lazy,Suspense} from 'react';
import {Route,Routes} from 'react-router-dom'
import style from './style.module.less'

const Home=lazy(()=>import('../../views/home'))
const SearchResult =lazy(()=>import('../../views/searchResult'))

const Index = () => {
    const ChildRoutes=()=>(
        <Routes>
            <Route path={'/'}  element={<Suspense fallback={<div>loading...</div>}>
                <Home/>
            </Suspense>} />
            <Route path={'/search/:keyword'}  element={<Suspense fallback={<div>loading...</div>}>
                <SearchResult/>
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




