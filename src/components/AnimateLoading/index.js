import React from 'react';
import './style.less'
import Animate1 from "./animates/Animate1";
import Animate2 from "./animates/Animate2";
import Animate3 from "./animates/Animate3";
const Index = (props) => {

    return (
        <div style={{display:props.show?'block':'none'}} className={'wjyyds-animate-loading-container'}>
            <Animate3 />
        </div>
    );
};
export default Index



