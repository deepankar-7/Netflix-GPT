
import Header from "./Header"
import GptSearchPage from "./GptSearchPage";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";




const Browse = () => {

    const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);


    // fetch data from tmdb api and upate the app store
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();




    return (
        <div >
            <Header />
            {
                showGptSearch ? <GptSearchPage /> :
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
            }
        </div>
    )
}

export default Browse