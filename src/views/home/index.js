import React, {useEffect, useRef, useState} from 'react';
import {getPersonalized} from '../../api/api'
import AlbumList from '../../components/AlbumList'
import {useNavigate} from 'react-router-dom'
import AnimateLoading from "../../components/AnimateLoading";

const Home = () => {
    const pageRef=useRef()
    const navigate =useNavigate()
    const [albums, setAlbums] = useState([])
    const [showLoading ,setShowLoading]=useState(false)
    useEffect(() => {
        getPersonalAlbums()
    }, [])


    const getPersonalAlbums = async () => {
        setShowLoading(true)
        const {result} = await getPersonalized()
        setShowLoading(false)
        setAlbums(result)
    }

    const handleAlbumClick=(id)=>{
        navigate(`/home/detail/${id}`)
    }
    return (
        <div ref={pageRef}>
            <AnimateLoading show={showLoading} />
            <AlbumList  albumClickHandle={handleAlbumClick} albums={albums}/>
        </div>
    );
};

export default Home;