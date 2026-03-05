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
  const [setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);
    } else {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "clickplus",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 7000);
    }
  }, []);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs("");
    }
  }, [songFilter]);

  const showInfo = () => {
    dispatch({
      type: actionType.SET_ALERT_TYPE,
      alertType: "deleted",
    });
    setInterval(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
    }, 4000);
  };

  return (
    // SEARCH BAR
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/newSongs"}
          className="flex items-center justify-center px-4 py-3 rounded-md hover bg-slate-800 hover:bg-gray-700 cursor-pointer"
        >
          <IoAdd className="text-white font-bold text-2xl" onDrag={showInfo} />
        </NavLink>

        <input
          type="text"
          className="w-52 px-4 py-2 border 
          border-gray-700 shadow-xl
         rounded-md bg-transparent outline-none hover:border-gray-500 
          duration-150 transition-all ease-in-out text-base text-white font-semibold"
          placeholder="Search..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      {/* Main iterface with songs */}
      <div className="relative w-full my-4 p-4 py-16">
        <div className="absolute top-4 left-4">
          <p className="text-base text-white">
            <span className=" text-white">Count :{""}</span>
            {filteredSongs ? filteredSongs?.length : allSongs?.length}
          </p>
        </div>
        {/* Song container */}
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
