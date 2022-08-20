import React from 'react';
import AppRouter from "../../router";
import AppHeader from '../../components/AppHeader'
import AppMusicPlayer from '../../components/AppMusicPlayer'
const Index = () => {
    return (
        <div>
            <AppHeader />
            <AppRouter />
            <AppMusicPlayer />
        </div>
    );
};

export default Index;