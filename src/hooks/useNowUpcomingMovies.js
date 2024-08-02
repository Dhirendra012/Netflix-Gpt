import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowUpcomingMovies } from "../utils/movieSlice";

const useNowUpcomingMovies = () => 
{
    const dispatch = useDispatch();

    const movie = useSelector((store) => store.movies.nowUpcomingMovies);

    const getNowUpcomingMovie = async () => 
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTION);
        const json = await data.json();
        dispatch(addNowUpcomingMovies(json.results)); 
    }
    
    useEffect(() => {!movie && getNowUpcomingMovie(); }, [])
}

export default useNowUpcomingMovies; 