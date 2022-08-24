import React from 'react';
import {Outlet} from 'react-router-dom'
import style from './style.module.less'

const Index = () => {
    return (
        <div className={style.app_view}>
            <Outlet></Outlet>
        </div>
    );
};

export default Index;




