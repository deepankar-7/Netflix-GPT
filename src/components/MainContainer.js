
import React, { useEffect } from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies) return;

    const mainMovie = movies[0];



    const { title, id, overview } = mainMovie





    return (
        <div className='md:pt-0 pt-[30%] bg-black'>

            <VideoTitle movieId={id} title={title} overview={overview} />
            <VideoBackground movieId={id} />

        </div>
    )
}

export default MainContainer