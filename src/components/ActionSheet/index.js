import React from 'react';

import './style.less'

const Index = (props) => {

    return (
        props.show && (<div onClick={props.onMaskClick} className={'wjyyds-action-sheet'}>
                <div className={'wjyyds-action-sheet-content'}>
                    {props.children}
                </div>

            </div>
        )
    )
};

export default Index