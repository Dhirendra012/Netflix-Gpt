import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondContainer = () => 
{
    const movies = useSelector((store) => store.movies); 

    return movies.nowPlayingMovies && movies.nowPopularMovies && movies.nowTrendingMovies && movies.nowUpcomingMovies && (
        <div className="bg-black">
            <div className="-mt-52 pl-12 relative z-20">
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
                <MovieList title={"Trending"} movies={movies.nowTrendingMovies}/>
                <MovieList title={"Popular"} movies={movies.nowPopularMovies}/>
                <MovieList title={"Upcoming"} movies={movies.nowUpcomingMovies}/>
            </div>
        </div>
    );
};

export default SecondContainer;