import React from 'react';
import style from './style.module.less'

const Index = (props) => {
    return (
        <div className={style.app_album_list}>
            {
                props.albums.map(v=>{
                    return (
                        <div onClick={()=>props.albumClickHandle(v.id)} key={v.id} className={style.app_album_item}>
                            <img className={style.app_album_item_cover} src={v.picUrl}/>
                            <p className={style.app_album_item_name}>{v.name}</p>
                        </div>
                    )
                })
            }


        </div>
    );
};

export default Index;