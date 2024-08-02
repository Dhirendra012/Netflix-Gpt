import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowTrendingMovies } from "../utils/movieSlice";

const useNowTrendingMovies = () => 
{
    const dispatch = useDispatch();

    const movie = useSelector((store) => store.movies.nowTrendingMovies);

    const getNowTrendingMovie = async () => 
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTION);
        const json = await data.json();
        dispatch(addNowTrendingMovies(json.results)); 
    }
    
    useEffect(() => {!movie &&  getNowTrendingMovie(); }, [])
}

export default useNowTrendingMovies; 