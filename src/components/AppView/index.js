import React from 'react';
import AppRouter from "../../router";
import style from './style.module.less'

const Index = () => {
    return (
        <div className={style.app_view} >
            <AppRouter />
        </div>
    );
};

export default Index;