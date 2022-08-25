import React, {useEffect, useRef, useState,useContext} from 'react';
import AlbumList from '../../components/AlbumList'
import {useNavigate} from 'react-router-dom'
import AnimateLoading from "../../components/AnimateLoading";
import PortalAnimateLoading from '../../components/PortalAnimateLoading'
import globalContext from "../../utils/globalContext";
import useLazyLoad from "../../hooks/useLazyLoad";
import {fetchPersonalList} from '../../redux/app/asyncActions'
import {connect} from "react-redux";

const Home = (props) => {
    const {setAppTitle} =useContext(globalContext)
    const navigate =useNavigate()
    const [showLoading ,setShowLoading]=useState(false)
    useEffect(() => {
        if(props.albumList.length==0){
            getPersonalAlbums()
        }
    }, [])

    useLazyLoad(props.albumList)

    //处理图片懒加载，废弃了，通过hooks处理了
    // const initLazyLoad =()=>{
    //     let callback = (entries) => {
    //         entries.forEach(v => {
    //             const {target, isIntersecting} = v
    //             if (isIntersecting) {
    //                 if(!target.src){
    //                     target.src = target.getAttribute('lazy_src')
    //                 }
    //                 observer.unobserve(target)
    //             }
    //         })
    //     }
    //     let options = {
    //         threshold:0
    //     };
    //     let observer = new IntersectionObserver(callback,options)
    //     let imgs= document.getElementsByTagName('img')
    //     Array.from(imgs).forEach(v=>observer.observe(v))
    //
    //    // return ()=>{observer.disconnect()}
    // }


    const getPersonalAlbums = async () => {
        setShowLoading(true)
        await props.fetchPersonalList()
        setShowLoading(false)
    }

    const handleAlbumClick=(id)=>{
        navigate(`/home/detail/${id}`)
    }
    return (
        <div className={'app-personal-home'}>
            {showLoading&&<PortalAnimateLoading />}
            <AlbumList  albumClickHandle={handleAlbumClick} albums={props.albumList}/>
        </div>
    );
};

const mapDispatchToProps={
    fetchPersonalList,
}

const mapStateToProps=(state)=>{
    return {
        albumList:state.app_reducer.appPersonalList
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home) ;