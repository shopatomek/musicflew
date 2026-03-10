import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { getAllSongs } from "../api/index";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";
import { motion } from "framer-motion";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.song });
      });
    }
  }, []);

  useEffect(() => {
    if (songFilter.length > 0 && allSongs) {
      const term = songFilter.toLowerCase();
      const filtered = allSongs.filter(
        (data) =>
          data.artist?.toLowerCase().includes(term) ||
          data.language?.toLowerCase().includes(term) ||
          data.name?.toLowerCase().includes(term),
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter, allSongs]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-6 mb-4">
        <NavLink
          to={"/newSongs"}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 active:scale-95 transition-transform"
        >
          <IoAdd className="text-black text-lg" />
          New Song
        </NavLink>

        {songFilter && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear className="text-2xl text-gray-400 cursor-pointer hover:text-white" />
          </motion.button>
        )}
      </div>

      <div className="relative w-full my-4 p-4 py-8">
        <div className="absolute top-4 left-4">
          <p className="text-sm text-gray-400">
            Count:{" "}
            {filteredSongs ? filteredSongs.length : (allSongs?.length ?? 0)}
          </p>
        </div>
        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};

export default DashboardSongs;
