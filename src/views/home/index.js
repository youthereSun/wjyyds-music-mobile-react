import React, {useEffect, useRef, useState,useContext} from 'react';
import {getPersonalized} from '../../api/api'
import AlbumList from '../../components/AlbumList'
import {useNavigate} from 'react-router-dom'
import AnimateLoading from "../../components/AnimateLoading";
import globalContext from "../../utils/globalContext";
import useLazyLoad from "../../hooks/useLazyLoad";

const Home = () => {
    const {setAppTitle} =useContext(globalContext)
    const navigate =useNavigate()
    const [albums, setAlbums] = useState([])
    const [showLoading ,setShowLoading]=useState(false)
    useEffect(() => {
        //setAppTitle('主页')
        getPersonalAlbums()

    }, [])

    useLazyLoad(albums)

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
        const {result} = await getPersonalized()
        setShowLoading(false)
        setAlbums(result)
        //setTimeout(()=>{initLazyLoad()},0)
    }

    const handleAlbumClick=(id)=>{
        navigate(`/home/detail/${id}`)
    }
    return (
        <div className={'app-personal-home'}>
            <AnimateLoading show={showLoading} />
            <AlbumList  albumClickHandle={handleAlbumClick} albums={albums}/>
        </div>
    );
};

export default Home;