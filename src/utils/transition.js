import React, {useEffect, useState} from 'react';
import 'animate.css'

const Transition = (props) => {

    const [animate, setAnimate] = useState('animate__bounceInLeft')

    return (
        <div style={{height:'100%'}} className={`animate__animated ${animate}`}>
            {props.children}
        </div>
    );
};

export default Transition;