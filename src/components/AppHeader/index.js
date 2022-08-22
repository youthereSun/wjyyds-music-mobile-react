import React from 'react';
import style from './style.module.less'
import { Input } from 'antd';
import {useNavigate} from 'react-router-dom'
import toastMessage from "../ToastMessage";
const Index = (props) => {
    const navigate =useNavigate()
    const keyPressHandler=(e)=>{
        if(e.which==13 && e.target.value){
            props.submitKeyword(e.target.value)
        }
    }

    const showAppInfo=()=>{
        toastMessage.show({
            text:'技术：react18，redux',
            delay:4000
        })
    }

    return (
        <div className={style.app_header}>
            <div className={style.app_header_title} onClick={showAppInfo}>网抑云</div>
            <Input onKeyPress={keyPressHandler} defaultValue={props.keyword} className={style.app_header_search} placeholder="Search" />
        </div>
    );
};

export default Index;