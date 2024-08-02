import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstants";
import { useRef } from "react";
import AI from "../utils/geminiApi";
import { API_OPTION } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => 
{
    const dispatch = useDispatch();
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang);

    const searchMovieTMDB = async (movie) => 
    {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTION);
        const json = await data.json();
        return json.results;
    };

    const handleSearchClick = async () =>
    {
        const prompt = "Act as a Movie Recommendation System and Suggext some movies for the query : " + searchText.current.value + ". Only give me names of 10 movies, comma seperated like the example results given ahead. Example Result: Fall Guy, Predater, Guntur, Jumanji."
        const result = await AI.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const movie = text.split(",");
        
        const promiseArray = movie.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(addGptMovieResult({movieNames : movie, movieResults : tmdbResults}));
    }

    return (
        <div className="pt-[10%] flex justify-center ">
            <form className="w-1/2 bg-black grid grid-cols-12 rounded-md" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type="text" className="p-4 m-4 col-span-9 rounded-md" placeholder={lang[langKey].gptSearchPlaceHolder}/>
                <button onClick={handleSearchClick} className="py-2 px-4 m-4 bg-red-600 text-white rounded-md col-span-3">{lang[langKey].search}</button>
            </form>
        </div>
    )
};

export default GptSearchBar;