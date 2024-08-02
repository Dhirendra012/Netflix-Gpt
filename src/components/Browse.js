import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import Header from "./Header";
import { LOGO, SUPPORTED_LANG } from  "../utils/constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondConatiner";
import useNowPopularMovies from "../hooks/useNowPopularMovies";
import useNowTrendingMovies from "../hooks/useNowTrendingMovies";
import useNowUpcomingMovies from "../hooks/useNowUpcomingMovies";
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearch } from "../utils/gptSlice";
import GptSearch from "./GptSearch";
import { changeLang } from "../utils/configSlice"

const Browse = () => 
{
    const showGpt = useSelector((state) => state.gpt.showGptSearch);
    const navigate = useNavigate();
    const dispatch = useDispatch(null);
    const setSignOut = () => 
    { 
        signOut(auth).then(() => { {/** Handled in Header */}})
        .catch((error) => 
        {  navigate("/error");  });
    }

    useNowPlayingMovies();
    useNowPopularMovies();
    useNowTrendingMovies();
    useNowUpcomingMovies();

    const handleGptSearch = () =>
    { dispatch(toggleGptSearch()) }

    const handleLangChange = (e) => 
    { dispatch(changeLang(e.target.value)); }

    return (
    <div>
        <Header/>
        <div className="z-10 absolute w-[100%] px-20 py-2 bg-gradient-to-b from-black flex justify-between">
            <img src={LOGO} alt="logo" className="w-44"/>

            <button onClick={handleGptSearch} className="font-bol text-white my-3 px-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">{ showGpt ? "Home Page" : "GPT Search" }</button>
            {showGpt && <select className="my-3 px-2 bg-gray-900 rounded-lg text-white" onClick={handleLangChange}>
                { SUPPORTED_LANG.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>}
            <button onClick={setSignOut} className="font-bold bg-red-500 text-slate-800 my-3 px-2 rounded-md hover:bg-slate-500 hover:text-white">Sign Out</button>
        </div>
        { showGpt ? <GptSearch/> : <> <MainContainer/><SecondContainer/> </>}
    </div>);
}

export default Browse;