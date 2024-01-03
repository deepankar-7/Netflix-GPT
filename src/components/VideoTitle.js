import React from 'react'
import { Link } from 'react-router-dom'

const VideoTitle = ({ movieId, title, overview }) => {

    return (
        <div className=' w-screen aspect-video absolute  pt-[12%] px-6 md:px-24 text-white bg-gradient-to-r from-black'>
            <h1 className='text-2xl md:text-5xl font-bold sm:w-1/3 '>{title}</h1>
            <p className='hidden md:inline-block py-6  w-1/4'>{overview}</p>
            <div className='my-4 md:m-0'>
                <Link to={"/watch?v=" + movieId} className=' hover:bg-opacity-80 bg-white text-black font-medium p-3 px-10 text-sm rounded-md' type="button">  Play</Link>
                <button className='hidden md:inline-block mx-2 bg-opacity-50 bg-gray-500 text-white font-medium py-1 md:py-3 px-2 md:px-12 text-sm rounded-md'> More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle