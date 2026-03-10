import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { IoClose } from "react-icons/io5";
import Logo from "../assets/img/logo.png";

// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const MusicPlayer = () => {
  const nextTrack = () => {
    if (songIndex > allSongs.lenght) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false,
    });
  };

  const [{ allSongs, songIndex }, dispatch] = useStateValue();

  return (
    //

    // Song Image
    <div className="w-full flex items-center gap-3">
      <div
        className={`w-full items-center gap-3 z-0 p-4 flex relative hover:border hover:bg-gray-800 bg-gray-900`}
      >
        <img
          src={allSongs[songIndex]?.imageURL || Logo} // Używa Logo, gdy imageURL jest puste/null
          alt="Song Cover"
          className="w-40 h-20 object-cover rounded-md"
          onError={(e) => {
            e.target.src = Logo; // Zabezpieczenie na wypadek, gdyby link był uszkodzony
          }}
        />
        {/* Song Name */}
        <div className="flex items-start flex-col">
          <p className="text-xl text-white font-semibold ml-1">
            {`${
              allSongs[songIndex]?.name.lenght > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}
            {""}
            {/* Album from music is comming */}
            <span className="text-base ml-1">
              ({allSongs[songIndex]?.album})
            </span>
          </p>
          {/* An artist name of the music */}
          <p className="text-white">
            {allSongs[songIndex]?.artist}
            <span className="text-sm text-white ml-1">
              ({allSongs[songIndex]?.category})
            </span>
          </p>
        </div>
        {/* Audio player */}
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            onPlay={() => console.log("Is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <IoClose className="text-white flex fl" onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;
