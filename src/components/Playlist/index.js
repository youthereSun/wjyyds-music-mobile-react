import React from 'react';
import style from './style.module.less'
const Index = (props) => {
    return (
        <div className={style.app_playlist}>
            {props.list.map((v,i)=>{
                return (
                    <div className={style.app_playlist_item}>
                        <div className={style.app_playlist_item_index} >{i+1}</div>
                        <div className={style.app_playlist_item_info}>
                            <p>{v.name}</p>
                            <p>{v.ar[0].name}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};

export default Index;