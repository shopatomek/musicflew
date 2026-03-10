import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllSongs } from "../api";
import SongList from "./SongList";
import { MdMusicNote } from "react-icons/md";

const SidebarSongList = ({ filter = "" }) => {
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.song });
      });
    }
  }, []);

  const songs = allSongs
    ? filter.trim().length > 0
      ? allSongs.filter(
          (s) =>
            s.name?.toLowerCase().includes(filter.toLowerCase()) ||
            s.artist?.toLowerCase().includes(filter.toLowerCase()),
        )
      : allSongs
    : [];

  return (
    <div className="w-60 min-w-[220px] border-r border-white/10 flex flex-col h-full overflow-hidden">
      <div className="px-4 pt-5 pb-3 flex items-center gap-2">
        <MdMusicNote className="text-gray-500 text-base" />
        <span className="text-xl uppercase tracking-widest text-gray-500 font-medium">
          Library
        </span>
        {songs.length > 0 && (
          <span className="ml-auto text-xs text-gray-600">{songs.length}</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {songs.length === 0 ? (
          <p className="text-xl text-gray-600 italic px-3 py-2">No songs yet</p>
        ) : (
          songs.map((song, i) => (
            <SongList key={song._id} data={song} index={i} type="song" />
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarSongList;
