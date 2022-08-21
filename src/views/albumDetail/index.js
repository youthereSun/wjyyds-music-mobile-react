import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {getPlayListDetail, getPlayListTrackAll} from '../../api/api'
import style from './style.module.less'
import Playlist from '../../components/Playlist'
import {connect} from 'react-redux'
import audioPlayer from "../../components/AudioPlayer";
import AnimateLoading from "../../components/AnimateLoading";


const Index = (props) => {
    const {id} = useParams()
    useEffect(() => {
        fetchAlbumInfo(id)
        fetchPlaylist(id)
    }, [])
    const [showLoading ,setShowLoading]=useState(false)
    const [albumInfo, setAlbumInfo] = useState({})
    const [albumPlaylist, setAlbumPlaylist] = useState([])
    const fetchAlbumInfo = async (id) => {
        setShowLoading(true)
        let {playlist: {coverImgUrl, description, name}} = await getPlayListDetail(id)
        //setShowLoading(false)
        setAlbumInfo({
            coverImgUrl,
            description,
            name
        })
    }

    const fetchPlaylist = async (id) => {
        setShowLoading(true)
        let {songs} = await getPlayListTrackAll(id)
        setShowLoading(false)
        setAlbumPlaylist(songs)
    }

    //将当前歌单加入playList
    const addAlbumToList = () => {
        if (albumPlaylist.length == 0) return
        let newList = []
        albumPlaylist.forEach(item => {
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
        <div className={style.app_album_info}>
            <AnimateLoading show={showLoading}/>
            <div className={style.app_album_info_block}>
                <div style={{display: "flex", height: "150px"}}>
                    <img onClick={addAlbumToList} className={style.app_album_play_all}
                         src={require('../../assets/images/playAll.png')}/>
                    <img className={style.app_album_cover} src={albumInfo.coverImgUrl}/>
                    <div style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <p className={style.app_album_name}>{albumInfo.name}</p>
                        <p className={style.app_album_name}>{albumInfo.description && albumInfo.description.substr(0, 10)}...</p>
                    </div>
                </div>
            </div>
            <Playlist list={albumPlaylist}/>
        </div>
    );
};

const mapDispatchToProps = {
    setPlayStatus: (payload) => {
        return {
            type: 'set_play_status',
            payload
        }
    },
    setPlayingInfo: (payload) => {
        return {
            type: 'set_playing_info',
            payload
        }
    },
    setPlaylist: (payload) => {
        return {
            type: 'set_playlist',
            payload
        }
    }
}

export default connect(null, mapDispatchToProps)(Index);