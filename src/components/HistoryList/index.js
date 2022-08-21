import React from 'react';
import {connect} from 'react-redux'
import './style.less'
import {checkSongValidity} from "../../api/api";
import audioPlayer from "../AudioPlayer";
const Index = (props) => {

    const playMusic=async (music,e)=>{
        e.stopPropagation()
        const {id} = music
        const res = await checkSongValidity(id)
        //如果当前播放的就是点击的，不作处理
        if (res.success && props.playingInfo.id!=id) {
            //更新当前播放信息
            props.setPlayingInfo(music)
            //更新播放状态
            props.setPlayStatus(true)
            audioPlayer.play(id)
        }
    }
    return (
        <div className={'app-history-list'}>
            {props.playlist.map((v,i)=>{
                return (
                    <div onClick={(e)=>playMusic(v,e)} key={v.id} className={"app_playlist_item"}>
                        <div  className={`${v.id==props.playingInfo.id?'active_item':'app_playlist_item_index'} `} >{i+1}</div>
                        <div className={"app_playlist_item_info"}>
                            <div >{v.musicName}</div>
                            <div style={{color:'#009688',fontSize:'12px'}}>{v.singer}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
const mapStateToProps=(state)=>{
    return {
        isPlay: state.app_reducer.isPlay,
        playingInfo:state.app_reducer.playingInfo,
        playlist:state.app_reducer.playlist
    }
}

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

}
export default connect(mapStateToProps,mapDispatchToProps)(Index) ;