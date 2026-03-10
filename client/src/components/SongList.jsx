import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { MdMusicNote } from "react-icons/md";

const SongList = ({ data, index, type }) => {
  const [{ songIndex, isSongPlaying }, dispatch] = useStateValue();

  const addContext = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_ISSONG_PLAYING, isSongPlaying: true });
    }
    if (songIndex !== index) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: index });
    }
  };

  const isActive = songIndex === index && isSongPlaying;

  return (
    <div
      onClick={type === "song" ? addContext : undefined}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group
        ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
    >
      {/* Thumbnail or music note placeholder */}
      <div className="w-9 h-9 min-w-[36px] rounded overflow-hidden bg-gray-800 flex items-center justify-center shrink-0">
        {data.imageURL ? (
          <img
            src={data.imageURL}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <MdMusicNote className="text-gray-500 text-base" />
        )}
      </div>

      {/* Name + artist */}
      <div className="flex flex-col min-w-0">
        <span
          className={`text-sm truncate ${isActive ? "text-green-400" : "text-white"}`}
        >
          {data.name?.length > 22 ? `${data.name.slice(0, 22)}…` : data.name}
        </span>
        <span className="text-xs text-gray-500 truncate">
          {data.artist?.length > 20
            ? `${data.artist.slice(0, 20)}…`
            : data.artist || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default SongList;
