import { useSelector } from "react-redux"

import MovieList from './MovieList';

// <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />



const SecondaryContainer = () => {
    const movies = useSelector(store => store?.movies);

    //


    return movies && (
        <div className="  bg-black pl-1 md:pl-12 ">
            <div className="mt-0   md:-mt-72 relative z-20">

                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />





            </div>


        </div>
    )
}

export default SecondaryContainer