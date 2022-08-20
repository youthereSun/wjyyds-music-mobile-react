import React, {useEffect, useState} from 'react';
import {getPersonalized} from '../../api/api'
import AlbumList from '../../components/AlbumList'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate =useNavigate()
    const [albums, setAlbums] = useState([])
    useEffect(() => {
        getPersonalAlbums()
    }, [])


    const getPersonalAlbums = async () => {
        const {result} = await getPersonalized()
        setAlbums(result)
    }

    const handleAlbumClick=(id)=>{
        navigate(`/home/detail/${id}`)
    }
    return (
        <div>
            <AlbumList  albumClickHandle={handleAlbumClick} albums={albums}/>
        </div>
    );
};

export default Home;