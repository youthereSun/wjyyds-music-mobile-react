import React from 'react';
import {useNavigate} from 'react-router-dom'
import './style.less'

const Index = () => {
    const navigate =useNavigate()

    const setToken=()=>{
        localStorage.setItem('token','kkk')
        navigate('/')
    }
    return (
       <div className={'login-container'} onClick={()=>setToken()}>
           <div className="spinner-box">
               <div className="configure-border-1">
                   <div className="configure-core"></div>
               </div>
               <div className="configure-border-2">
                   <div className="configure-core"></div>
               </div>
           </div>
       </div>
    );
};

export default Index;