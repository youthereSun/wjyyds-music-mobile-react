import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader'
import AppMusicPlayer from '../../components/AppMusicPlayer'
import AppView from '../../components/AppView'
import {useNavigate} from 'react-router-dom'
import style from './style.module.less'

const Index = () => {
    const navigate =useNavigate()
    const [keyword,setKeyword]=useState('许嵩')

    const submitKeywordHandler=(val)=>{
        setKeyword(val)
        navigate(`/home/search/${val}`)
    }

    return (
        <div className={style.app_layout}>
            <AppHeader keyword={keyword} submitKeyword={submitKeywordHandler}/>
            <AppView/>
            <AppMusicPlayer/>
        </div>
    );
};

export default Index;