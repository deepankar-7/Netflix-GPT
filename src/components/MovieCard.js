
import { IMG_CDN_URL } from './../utils/constants';

const MovieCard = ({ movie }) => {
    const { title, poster_path } = movie;
    if (!poster_path) return null
    return (
        <div className=" w-36 pr-4 md:w-48">

            <img className='rounded-md ' alt={`${title}Poster`} src={IMG_CDN_URL + poster_path} />

        </div>
    )
}

export default MovieCard