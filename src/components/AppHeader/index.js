import React, {useState} from 'react';
import style from './style.module.less'
import { Input } from 'antd';
import toastMessage from "../ToastMessage";
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import {connect} from 'react-redux'


let  themeDom=document.querySelector('meta[name="themecolor"]')
const Index = (props) => {

    const [enableDark,setEnableDark] =useState(false)
    const keyPressHandler=(e)=>{
        if(e.which==13 && e.target.value){
            props.submitKeyword(e.target.value)
        }
    }

    const showAppInfo=()=>{
        if(enableDark){
            document.getElementById('root').classList.remove('dark-mode')
            themeDom.setAttribute('content','#ffffff')
        }else {
            document.getElementById('root').classList.add('dark-mode')
            themeDom.setAttribute('content','#000000')
        }
        setEnableDark(!enableDark)
        // toastMessage.show({
        //     text:'技术：react18，redux react-router-dom6 ant-motion',
        //     delay:4000
        // })
    }

   const getEnter = (e) => {
        switch (e.index) {
            case 0:
                return {
                    rotate: 90,
                    opacity: 0,
                    y: -60,
                };
            case 10:
            case 1:
                return {
                    y: -60,
                    x: -10,
                    opacity: 0,
                };
            case 9:
            case 2:
                return {
                    y: -60,
                    x: 20,
                    opacity: 0,
                };
            case 3:
                return {
                    y: 60,
                    opacity: 0,
                };
            case 8:
            case 4:
                return {
                    x: 30,
                    opacity: 0,
                };
            case 5:
                return {
                    enter: [
                        {
                            scale: 2,
                            opacity: 0,
                            type: 'set',
                        },
                        { scale: 1.2, opacity: 1, duration: 300 },
                        { scale: 0.9, duration: 200 },
                        { scale: 1.05, duration: 150 },
                        { scale: 1, duration: 100 },
                    ],
                    leave: {
                        opacity: 0, scale: 0,
                    },
                };
            case 6:
                return {
                    scale: 0.8,
                    x: 30,
                    y: -10,
                    opacity: 0,
                };
            case 7:
                return {
                    scale: 0.8,
                    x: 30,
                    y: 10,
                    opacity: 0,
                };
            default:
                return {
                    opacity: 0,
                };
        }
    }

    return (
        <div className={style.app_header}>
            <div className={style.app_header_title} onClick={showAppInfo}> <Texty  enter={getEnter} leave={getEnter}>{props.appTitle}</Texty></div>
            <Input onKeyPress={keyPressHandler} defaultValue={props.keyword} className={style.app_header_search} placeholder="Search" />
        </div>
    );
};

const mapDispatchToProps={
    setAppTitle:(payload)=>{
        return {
            type:'set_app_title',
            payload
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        appTitle:state.app_reducer.appTitle
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Index);