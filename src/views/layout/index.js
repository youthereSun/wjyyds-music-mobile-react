import React, { useState} from 'react';
import AppHeader from '../../components/AppHeader'
import AppMusicPlayer from '../../components/AppMusicPlayer'
import AppView from '../../components/AppView'
import {useNavigate, useLocation} from 'react-router-dom'
import style from './style.module.less'
import GlobalContext from "../../utils/globalContext";

const Index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [keyword, setKeyword] = useState('许嵩')
    const [appTitle,setAppTitle] =useState('')

    const submitKeywordHandler = (val) => {
        setKeyword(val)
        if (location.pathname.includes('search')) {
            navigate(`/home/search/${val}`, {replace: true})
        } else {
            navigate(`/home/search/${val}`)
        }
    }

    return (
        <GlobalContext.Provider value={{appTitle,setAppTitle}}>
            <div className={style.app_layout}>
                <AppHeader appTitle={appTitle} keyword={keyword} submitKeyword={submitKeywordHandler}/>
                <AppView/>
                <AppMusicPlayer/>
            </div>
        </GlobalContext.Provider>
    );
};

export default Index;