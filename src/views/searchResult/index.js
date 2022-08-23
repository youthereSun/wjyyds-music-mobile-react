import React, {useEffect, useState,useContext} from 'react';
import {useParams} from 'react-router-dom'
import {checkSongValidity, searchByKeyword} from '../../api/api'
import Playlist from "../../components/Playlist";
import VirtualList from '../../components/VirtualPlaylist'
import { PlayCircleOutlined } from '@ant-design/icons';
import audioPlayer from "../../components/AudioPlayer";
import {connect} from "react-redux";
import AnimateLoading from "../../components/AnimateLoading";
import GlobalContext from '../../utils/globalContext'
import style from './style.module.less'


const Index = (props) => {
    const {setAppTitle}=useContext(GlobalContext)

    const params = useParams()
    useEffect(() => {
        const {keyword} = params
        handleSearch(keyword)
        //setAppTitle('搜索')

    }, [])
    const [songs, setSongs] = useState([])
    const [showLoading ,setShowLoading]=useState(false)

    const handleSearch = async (keyword) => {
        setShowLoading(true)
        let res = await searchByKeyword(keyword)
        setShowLoading(false)
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
        <div style={{overflow:'hidden'}}>
            <AnimateLoading show={showLoading} />
            <div onClick={addAlbumToList} style={{display:"flex",height:"50px",paddingLeft:"20px",alignItems:'center'}}>
                <div style={{fontWeight:'bold',fontSize:"18px",padding:'10px',color:'#009688'}}>播放全部</div>
                <PlayCircleOutlined style={{fontWeight:'bold',fontSize:"20px",color:'#009688'}} />
            </div>
           <div  style={{overflow:"hidden",height:'calc(100vh - 210px)'}}>
               {/*<Playlist list={songs}/>*/}
               <VirtualList itemHeight={80} list={songs}>
                   {
                       ({offsetTop,itemHeight,v,i})=>{
                           return (
                               <div onClick={()=>playMusic(v)} className={style.app_virtual_playlist_item} >
                                   <div className={style.app_playlist_item_index} >{Math.floor(offsetTop/itemHeight)+i+1}</div>
                                   <div className={style.app_playlist_item_info}>
                                       <div >{v.name}</div>
                                       <div style={{color:'#009688',fontSize:'12px'}}>{v.ar[0].name}</div>
                                   </div>
                               </div>
                           )
                       }
                   }
               </VirtualList>
           </div>
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
    setPlaylist:(payload)=>{
        return{
            type:'set_playlist',
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

export default connect(mapStateToProps,mapDispatchToProps)(Index) ;