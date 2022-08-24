import React from 'react';
import {useNavigate} from 'react-router-dom'

const Index = () => {
    const navigate =useNavigate()

    const setToken=()=>{
        localStorage.setItem('token','kkk')
        navigate('/')
    }
    return (
        <div>
            login
            <button onClick={setToken}>login</button>
        </div>
    );
};

export default Index;