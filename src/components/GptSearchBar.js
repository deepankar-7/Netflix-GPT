import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { openai } from "../utils/openai";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";



const GptSearchBar = () => {
    const dispatch = useDispatch();

    const langIdentifier = useSelector(store => store.config?.lang);

    const gptSearchText = useRef(null);

    const searchTmdbMovieDB = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS)
        const json = await data.json();
        return (json.results)
    }

    const hadleGptSearchButtonClick = async () => {

        const gptQuery = "Act as a movie recommendation sysytem and suggest some move for the querry:" +
            gptSearchText.current.value +
            ". only give me names of 10 movies,comma seperated like the example given ahead. Example it,ki po che,vow"

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: gptQuery
                }
            ],
            model: 'gpt-3.5-turbo',
        });

        const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(",")

        const promiseArray = gptMovies.map(movie => searchTmdbMovieDB(movie));

        const tmdbResults = await Promise.all(promiseArray);

        dispatch(addGptMovieResults({ movieResults: tmdbResults, movieNames: gptMovies }));

        console.log(tmdbResults)



    }

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center ">
            <form onSubmit={(e) => { e.preventDefault() }} className=" w-full md:w-1/2 bg-black grid grid-cols-12 bg-opacity-80 rounded-md ">
                <input
                    className="col-span-9 p-4 m-4 rounded-md"
                    type="text "
                    placeholder={lang[langIdentifier].gptSearchPlaceholder}
                    ref={gptSearchText}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4  bg-red-700 text-white rounded-md"
                    onClick={hadleGptSearchButtonClick}
                >
                    {lang[langIdentifier].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar