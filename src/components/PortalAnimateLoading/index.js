import React from 'react';
import './style.less'
import Animate1 from "./animates/Animate1";
import Animate2 from "./animates/Animate2";
import Animate3 from "./animates/Animate3";
import {createPortal} from "react-dom";
const Index = () => {
    //createPortal可以将元素挂载在dom之外
    return createPortal(<div className={'wjyyds-animate-loading-container'}>
        <Animate3 />
    </div>,document.body)
};
export default Index



