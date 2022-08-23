import React, {useEffect} from 'react';
import style from './style.module.less'
import LazyLoadImg from '../LazyLoadImg'

const Index = (props) => {


    return (
        <div id='app_album_list' className={style.app_album_list}>
            {
                props.albums.map(v=>{
                    return (
                        <div onClick={()=>props.albumClickHandle(v.id)} key={v.id} className={style.app_album_item}>
                            {/*<LazyLoadImg className={style.app_album_item_cover} lazy_src={v.picUrl}/>*/}
                            <img className={style.app_album_item_cover} lazy_src={v.picUrl}/>
                            <p className={style.app_album_item_name}>{v.name}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Index;