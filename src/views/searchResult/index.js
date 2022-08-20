import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {searchByKeyword} from '../../api/api'

const Index = () => {
    const params = useParams()
    useEffect(() => {
        const {keyword} = params
        handleSearch(keyword)
    }, [])
    const [songs, setSongs] = useState([])

    const handleSearch = async (keyword) => {
        let res = await searchByKeyword(keyword)
    }


    return (
        <div>
            search!
        </div>
    );
};

export default Index;