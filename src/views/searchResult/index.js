import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

const Index = () => {
    const params = useParams()
    useEffect(()=>{
        console.log('params',params)
    },[])

    return (
        <div>
            search!
        </div>
    );
};

export default Index;