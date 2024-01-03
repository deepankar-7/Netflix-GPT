import { useDispatch, useSelector } from "react-redux";
import { addNowplayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";



const useNowPlayingMovies = () => {

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addNowplayingMovies(json.results))

    }

    useEffect(() => {

        !nowPlayingMovies && getNowPlayingMovies();

    }, [])

}

export default useNowPlayingMovies