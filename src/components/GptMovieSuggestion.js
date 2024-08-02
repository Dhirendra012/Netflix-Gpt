import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => 
{
    const { movieNames , movieResults } = useSelector((store) => store.gpt);
    if(!movieResults){ return null; }

    return (
        <div className="rounded-lg mt-32 p-4 m-4 text-white opacity-90 backdrop-blur-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div>
                {
                    movieNames.map((movieNames , index) => 
                    <MovieList key={movieNames} title={movieNames} movies={movieResults[index]}/>)
                }
            </div>
        </div>
    )
};

export default GptMovieSuggestion;