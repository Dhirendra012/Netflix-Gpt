import { IMG_PATH } from "../utils/constants";

const MovieCard = ({posterPath}) => 
{
    if(!posterPath){ return null; }
    return (
        <div className="w-44 pr-6">
            <img className="rounded-md" alt="Movie Card" src={IMG_PATH + posterPath}/>
        </div>
    )
};

export default MovieCard;