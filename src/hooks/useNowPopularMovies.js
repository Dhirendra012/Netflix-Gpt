import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPopularMovies } from "../utils/movieSlice";

const useNowPopularMovies = () => 
{
    const dispatch = useDispatch();

    const movie = useSelector((store) => store.movies.nowPopularMovies);

    const getNowPopularMovie = async () => 
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTION);
        const json = await data.json();
        dispatch(addNowPopularMovies(json.results)); 
    }
    
    useEffect(() => {!movie &&  getNowPopularMovie(); }, [])
}

export default useNowPopularMovies; 