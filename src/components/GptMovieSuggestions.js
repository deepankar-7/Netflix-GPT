import { useSelector } from "react-redux"
import MovieList from "./MovieList";











const GptMovieSuggestions = () => {
    const { movieNames, movieResults } = useSelector(store => store.gpt)

    if (!movieNames) return null;



    return (

        <div className="">
            <div className="bg-black bg-opacity-60">
                {
                    movieNames.map((movies, index) =>
                        <MovieList
                            key={movies}
                            title={movies}
                            movies={movieResults[index]}
                        />
                    )}

            </div>
        </div>

    )
}

export default GptMovieSuggestions