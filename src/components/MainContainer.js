import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => 
{
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if(!movies){ return; }
    const mainMovie = movies[3];

    const { overview , title , id} = mainMovie; 

    return (
        <div>
            <VideoTitle overview={overview} title={title}/>
            <VideoBackground movieId={id}/>
        </div>
    );
};

export default MainContainer;