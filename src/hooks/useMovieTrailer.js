import { useDispatch, useSelector } from "react-redux";
import { addMovieId } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constants";

const useMovieTrailer = (movieId) => 
{
    const dispatch = useDispatch(null);

    const getMovieVideos = async () =>
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId  + '/videos?language=en-US', API_OPTION);
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = (filterData.length) ? filterData[0] : json.results[0];
        dispatch(addMovieId(trailer)); 
    }

    useEffect(() => {  getMovieVideos(); } , []);
}

export default useMovieTrailer;