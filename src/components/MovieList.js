
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {

    if (!movies) return null


    return (
        <div className="pl-12 p-2 m-2">

            <h1 className='text-lg md:text-3xl  py-2 pt-10  text-white'>{title}</h1>
            <div className=' flex overflow-x-scroll no-scrollbar'>
                <div className='flex'>
                    {movies?.map(movie => <Link
                        key={movie.id}
                        to={"/watch?v=" + movie.id}> <MovieCard movie={movie} /></Link>)}
                </div>
            </div>

        </div>

        //<MovieCard movie={movies} />

    )
}

export default MovieList