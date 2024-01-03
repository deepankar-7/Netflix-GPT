import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";



const useMovieTrailer = (movieId) => {

    //const movieId = useSelector(store => store.movies?.nowPlayingMovies[0].id)
    const trailerVideo = useSelector(store => store.movies.trailerVideo)


    const dispatch = useDispatch();


    const getMainMovieVideos = async () => {

        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();
        const movieVideos = json.results;



        const filterData = movieVideos.filter(video => video.type === "Trailer")
        const trailerVideo = filterData.length ? filterData[0] : movieVideos[0];


        dispatch(addTrailerVideo(trailerVideo));



    }

    useEffect(() => {
        !trailerVideo && getMainMovieVideos();
    }, [])

}

export default useMovieTrailer