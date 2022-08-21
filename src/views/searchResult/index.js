import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {searchByKeyword} from '../../api/api'
import Playlist from "../../components/Playlist";
import { PlayCircleOutlined } from '@ant-design/icons';
import audioPlayer from "../../components/AudioPlayer";
import {connect} from "react-redux";

const Index = (props) => {
    const params = useParams()
    useEffect(() => {
        const {keyword} = params
        handleSearch(keyword)
    }, [])
    const [songs, setSongs] = useState([])

    const handleSearch = async (keyword) => {
        let res = await searchByKeyword(keyword)
        setSongs(res.result.songs)
    }

    //将当前歌单加入playList
    const addAlbumToList = () => {
        if (songs.length == 0) return
        let newList = []
        songs.forEach(item => {
            const {id} = item
            const musicName = item?.al?.name
            const musicCover = item?.al?.picUrl
            const singer = item?.ar[0]?.name
            newList.push({id, musicCover, musicName, singer})
        })
        props.setPlaylist(newList)
        props.setPlayStatus(true)
        props.setPlayingInfo(newList[0])
        audioPlayer.play(newList[0].id)
    }


    return (
        <div>
            <div onClick={addAlbumToList} style={{display:"flex",padding:'20px',alignItems:'center'}}>
                <PlayCircleOutlined style={{fontWeight:'bold',fontSize:"20px",color:'#009688'}} />
                <div style={{fontWeight:'bold',fontSize:"18px",padding:'10px',color:'#009688'}}>播放全部</div>
            </div>
            <Playlist list={songs}/>
        </div>
    );
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
    setPlaylist:(payload)=>{
        return{
            type:'set_playlist',
            payload
        }
    }
}

export default connect(null,mapDispatchToProps)(Index) ;