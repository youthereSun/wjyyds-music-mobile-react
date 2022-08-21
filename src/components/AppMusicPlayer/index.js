import React, {useEffect, useState} from 'react';
import style from './style.module.less'
import {connect} from 'react-redux'
import audioPlayer from "../AudioPlayer";
import { FastBackwardOutlined, FastForwardOutlined ,ClockCircleOutlined} from '@ant-design/icons';
import ActionSheet from '../ActionSheet'
import HistoryList from '../HistoryList'

const Index = (props) => {
    useEffect(()=>{
        console.log(props)
    },[])

    const [showAC,setShowAC]=useState(false)
    //点击播放按钮的处理
    const handleChangeStatus=()=>{
        if(props.isPlay){
            props.setPlayStatus(false)
            audioPlayer.pause()
        }else {
            if(props.playingInfo.id){
                props.setPlayStatus(true)
                audioPlayer.play()
            }
        }
    }

    const goNext=()=>{
        if(props.playingInfo.id){
            let next
           let index= props.playlist.findIndex(v=>v.id==props.playingInfo.id)
            if(index<props.playlist.length-1){
                next= props.playlist[index+1]
            }else {
                next=props.playlist.at(-1)
            }

            props.setPlayStatus(true)
            props.setPlayingInfo(next)
            audioPlayer.play(next.id)
        }
    }

    const goPrev=()=>{
        if(props.playingInfo.id){
            let next
            let index= props.playlist.findIndex(v=>v.id==props.playingInfo.id)
            if(index!=0){
                next= props.playlist[index-1]
            }else {
                next=props.playlist[0]
            }
            props.setPlayStatus(true)
            props.setPlayingInfo(next)
            audioPlayer.play(next.id)
        }
    }

    return (
        <div className={style.app_music_player}>
            <ActionSheet show={showAC} onMaskClick={()=>setShowAC(false)} >
                   <HistoryList />
            </ActionSheet>
            <img className={style.app_music_player_cover} src={props.playingInfo.id?props.playingInfo.musicCover:require('../../assets/images/none.png')}/>
            <div className={style.app_music_player_controls}>
                <FastBackwardOutlined onClick={goPrev} className={style.app_music_player_icon} />
                <img onClick={handleChangeStatus} className={style.app_music_player_op} src={props.isPlay? require('../../assets/images/pause.png'): require('../../assets/images/play.png')}/>
                <FastForwardOutlined onClick={goNext} className={style.app_music_player_icon} />
            </div>

            <ClockCircleOutlined onClick={()=>setShowAC(true)} className={style.app_music_player_list} />


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