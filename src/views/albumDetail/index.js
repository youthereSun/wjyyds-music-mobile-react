import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {getPlayListDetail,getPlayListTrackAll} from '../../api/api'
import style from './style.module.less'
import Playlist from '../../components/Playlist'
const Index = () => {
    const {id} =useParams()
    useEffect(()=>{
        fetchAlbumInfo(id)
        fetchPlaylist(id)
    },[])

    const [albumInfo,setAlbumInfo] =useState({})
    const [albumPlaylist,setAlbumPlaylist] =useState([])
    const fetchAlbumInfo=async (id)=>{
      let {playlist:{coverImgUrl,description,name}}=  await getPlayListDetail(id)
        setAlbumInfo({
            coverImgUrl,
            description,
            name
        })
    }

    const fetchPlaylist=async (id)=>{
        let {songs}=  await getPlayListTrackAll(id)
        setAlbumPlaylist(songs)
    }

    return (
        <div className={style.app_album_info}>
            <div className={style.app_album_info_block} >
               <div style={{display:"flex",height:"150px"}}>
                   <img className={style.app_album_cover} src={albumInfo.coverImgUrl} />
                  <div style={{padding:"20px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                      <p className={style.app_album_name}>{albumInfo.name}</p>
                      <p className={style.app_album_name}>{albumInfo.description&&albumInfo.description.substr(0,10)}></p>
                  </div>
               </div>
            </div>
            <Playlist list={albumPlaylist}/>



        </div>
    );
};

export default Index;