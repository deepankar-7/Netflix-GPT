import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_OPTIONS, IMG_CDN_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addCastDetail, addMovieDetail, addWatchTrailer, clearWatchMovie } from '../utils/movieSlice';

const WatchPage = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const movieId = searchParams.get("v")



    const movieDetail = useSelector(store => store.movies.watchMovie?.movieDetail);
    const trailer = useSelector(store => store.movies.watchMovie?.watchTrailer);




    const getMovieDetails = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId, API_OPTIONS)
        const json = await data.json();
        dispatch(addMovieDetail(json))


    }

    const getTrailer = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos", API_OPTIONS)
        const json = await data.json();

        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addWatchTrailer(trailer))
    }

    const getCastDetail = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/credits", API_OPTIONS)
        const json = await data.json();
        dispatch(addCastDetail(json))
    }

    const cast = useSelector(store => store.movies.watchMovie?.castDetail);
    const director = cast?.crew.filter(f => f.job === "Director")
    const writer = cast?.crew.filter(f => f.job === "Screenplay")





    useEffect(() => {
        getMovieDetails();
        getTrailer();
        getCastDetail();

        return () => {
            console.log("clean up called")
            dispatch(clearWatchMovie())

        }
    }, [])





    return (

        <>
            <Link to={"/browse"} >
                <img
                    alt='home'
                    src='https://www.iconbolt.com/iconsets/ionicons-regular/arrow-back-circle.svg'
                    className='  hover:bg-yellow-400  rounded-full h-10 mt-10 ml-14 absolute  bg-gray-400' />
            </Link>

            {trailer?.key
                ?
                (<div className='bg-black  text-white  '>

                    <div className=' mb-10  flex justify-center items-center'>
                        <iframe
                            className='rounded-lg w-11/12 aspect-video'
                            src={
                                "https://www.youtube.com/embed/" +
                                trailer?.key + "?autoplay=1&loop=1&showinfo=0&playlist=" +
                                trailer?.key
                            }
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>


                    <div className='  mt-[10px] md:flex'>

                        <div className="md:pl-[80px] md:pr-[80px] mr-[15px]  ">
                            <img className="w-56 mb-5 md:mb-0 rounded-lg  md:w-[550px] md:h-[700px] justify-center align-middle m-auto"
                                alt="backgroundimage"
                                src={IMG_CDN_URL + movieDetail?.poster_path}
                            />
                        </div>

                        <div className="md:w-[780px]  md:mr-[95px]">

                            <div className="md:text-6xl text-2xl flex text-yellow-400">
                                {movieDetail?.original_title}(
                                {new Date(movieDetail?.release_date).getFullYear()}
                                )
                            </div>

                            <div className='flex mt-3'>
                                <span className="text-xl  text-white mt-3">IMDB rating:</span>
                                <p className='mt-2 ml-2  bg-yellow-400 text-white rounded-full h-12 w-12 text-center p-2'   >{movieDetail?.vote_average.toFixed(1)} </p>

                            </div>


                            <div>
                                <h1 className="text-xl  text-white mt-3 mb-3">Overview:</h1>
                                <div className="text-sm md:w-[65%]">{movieDetail?.overview}</div>
                            </div>



                            <div className="md:flex justify-between mt-7 mb-3">
                                <div className='flex md:flex-none'>
                                    <span className='text-white'>Status:</span>
                                    <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 ">{movieDetail?.status}</div>

                                </div>
                                <div className='flex md:flex-none'>
                                    <span className='text-white'>Runtime:</span>
                                    <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 ">{movieDetail?.runtime}min</div>

                                </div>
                                <div className='flex md:flex-none'>
                                    <span className='text-white'>Release:</span>
                                    <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 ">{movieDetail?.release_date}</div>

                                </div>
                            </div>


                            {director?.length > 0 && (
                                <div className=" mt-7 text-white border border-t-gray-600 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                                    <span className="mr-2" >
                                        Director  :  {"  "}
                                    </span>
                                    <span className="text-gray-400">
                                        {director?.map((d, i) => (
                                            <span key={i}>
                                                {d.name}
                                                {director.length - 1 !== i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}



                            {writer?.length > 0 && (
                                <div className="  text-white border border-t-0 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                                    <span className="mr-2">
                                        Writer  :  {"  "}
                                    </span>
                                    <span className="text-gray-400">
                                        {writer?.map((d, i) => (
                                            <span key={i}>
                                                {d.name}
                                                {writer.length - 1 !== i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}

                            <h1 className="text-semibold text-xl mt-3">Top Cast</h1>
                            <div className="overflow-x-scroll no-scrollbar">

                                <span className="flex w-[2000px] ">
                                    {cast?.cast.map((item) => {
                                        if (!item.profile_path) return null;
                                        return (
                                            <div className="" key={item.id}>
                                                <div >
                                                    <div className="p-3  w-[100px]"><img className="h-[85px] rounded-full" alt="profile_image" src={IMG_CDN_URL + item.profile_path} /></div>
                                                    <div className="w-[90px] text-[10px] m-auto">{item.name}</div>
                                                    <div className="text-[12px] w-[50px] h-[20px] overflow-clip text-gray-400 m-auto">{item.character}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </span>
                            </div>




                        </div>
                    </div>





                </div>
                )


                : null






            }



        </>

    )
}

export default WatchPage