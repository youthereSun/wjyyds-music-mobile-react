import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom'
import 'animate.css'
import './style.less'

const Index = (props) => {
    const [animate,setAnimate] =useState('')
    const [visible,setVisible] =useState(false)
    useEffect(()=>{
       if(props.show){
           setAnimate('animate__bounceInUp')
           setVisible(true)
       }else {
           setAnimate('animate__bounceOutDown')
           setTimeout(()=>{
               setVisible(false)
           },500)
       }
    },[props.show])

    return (
        visible && (createPortal(<div onClick={props.onMaskClick} className={`wjyyds-action-sheet animate__animated ${animate} animate__faster`}>
                <div className={'wjyyds-action-sheet-content'}>
                    {props.children}
                </div>

            </div>,document.body)
        )
    )
};

export default Index