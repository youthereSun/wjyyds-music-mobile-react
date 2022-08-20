import React from 'react';
import style from './style.module.less'
import { Input } from 'antd';
const Index = (props) => {
    const keyPressHandler=(e)=>{
        if(e.which==13 && e.target.value){
            props.submitKeyword(e.target.value)
        }
    }

    return (
        <div className={style.app_header}>
            <div className={style.app_header_title}>个人推荐</div>
            <Input onKeyPress={keyPressHandler} defaultValue={props.keyword} className={style.app_header_search} placeholder="Search" />
        </div>
    );
};

export default Index;