import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { IoClose } from "react-icons/io5";
import Logo from "../assets/img/logo.png";

const MusicPlayer = () => {
  // Hook must be at the top before any functions that use its values
  const [{ allSongs, songIndex }, dispatch] = useStateValue();

  const nextTrack = () => {
    if (songIndex >= allSongs.length - 1) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: 0 });
    } else {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: songIndex + 1 });
    }
  };

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: 0 });
    } else {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: songIndex - 1 });
    }
  };

  const closePlayer = () => {
    dispatch({ type: actionType.SET_ISSONG_PLAYING, isSongPlaying: false });
  };

  const currentSong = allSongs[songIndex];

  return (
    <div className="w-full flex items-center gap-3">
      <div className="w-full items-center gap-3 z-0 p-4 flex relative hover:border hover:bg-gray-800 bg-gray-900">
        <img
          src={currentSong?.imageURL || Logo}
          alt="Song Cover"
          className="w-40 h-20 object-cover rounded-md"
          onError={(e) => {
            e.target.src = Logo;
          }}
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-white ml-1">
            {currentSong?.name?.length > 20
              ? `${currentSong.name.slice(0, 20)}…`
              : currentSong?.name}
            {currentSong?.album && (
              <span className="text-base ml-1">({currentSong.album})</span>
            )}
          </p>
          <p className="text-white">
            {currentSong?.artist}
            {currentSong?.category && (
              <span className="text-sm text-white ml-1">
                ({currentSong.category})
              </span>
            )}
          </p>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={currentSong?.songURL}
            onPlay={() => console.log("Is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <IoClose className="text-white cursor-pointer" onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;
