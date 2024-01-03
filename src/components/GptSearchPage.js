import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMAGE } from "../utils/constants";


const GptSearchPage = () => {
    return (

        <>
            <div className=" fixed -z-10 ">
                <img className="h-screen object-cover md:h-fit" src={BACKGROUND_IMAGE}
                    alt="background-img"></img>
            </div>
            <div className="">

                <GptSearchBar />
                <GptMovieSuggestions />
            </div>

        </>

    )
}

export default GptSearchPage;