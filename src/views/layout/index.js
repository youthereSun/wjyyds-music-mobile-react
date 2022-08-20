import React from 'react';
import AppHeader from '../../components/AppHeader'
import AppMusicPlayer from '../../components/AppMusicPlayer'
import AppView from '../../components/AppView'
import style from './style.module.less'

const Index = () => {
    return (
        <div className={style.app_layout}>
            <AppHeader/>
            <AppView/>
            <AppMusicPlayer/>
        </div>
    );
};

export default Index;