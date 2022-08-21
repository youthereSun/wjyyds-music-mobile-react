import React from 'react';
import style from './style.module.less'
import audioPlayer from "../AudioPlayer";
import {connect} from 'react-redux'
import {checkSongValidity} from "../../api/api";
const Index = (props) => {

    const playMusic=async (music)=>{

        const {id} = music
        const musicName = music?.al?.name
        const musicCover = music?.al?.picUrl
        const singer = music?.ar[0]?.name
        const res = await checkSongValidity(id)
        //如果当前播放的就是点击的，不作处理
        if (res.success && props.playingInfo.id!=id) {
            //更新当前播放信息
            const payload =  {musicName, musicCover, singer, id}
            props.setPlayingInfo(payload)
            //更新播放状态
            props.setPlayStatus(true)
            //加入历史记录,需要判重
            props.addToPlaylist(payload)

            audioPlayer.play(id)

        }
    }

    return (
        <div className={style.app_playlist}>
            {props.list.map((v,i)=>{
                return (
                    <div onClick={()=>playMusic(v)}  key={v.id} className={style.app_playlist_item}>
                        <div className={style.app_playlist_item_index} >{i+1}</div>
                        <div className={style.app_playlist_item_info}>
                            <div >{v.name}</div>
                            <div style={{color:'#009688',fontSize:'12px'}}>{v.ar[0].name}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

const mapDispatchToProps={
    setPlayStatus:(payload)=>{
        return {
            type:'set_play_status',
            payload
        }
    },
    setPlayingInfo:(payload)=>{
        return {
            type:'set_playing_info',
            payload
        }
    },
    addToPlaylist:(payload)=>{
        return{
            type: 'add_to_playlist',
            payload
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        playingInfo:state.app_reducer.playingInfo,
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Index);