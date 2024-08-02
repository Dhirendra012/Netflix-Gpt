const VideoTitle = ({overview , title}) => 
{
    return (
        <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white  bg-gradient-to-r from-black">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/3">{overview}</p>
            <div>
                <button className="bg-white text-black p-4 px-12 text-xl rounded-lg">▶️Play</button>
                <button className="mx-2 bg-white text-whote p-4 px-12 text-xl bg-opacity-40 rounded-lg">More Info</button>
            </div>
        </div>
    );
};

export default VideoTitle;