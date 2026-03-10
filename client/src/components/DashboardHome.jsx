import React from "react";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getAllUsers, getAllArtists, getAllSongs, getAllAlbums } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { Link, useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import SongList from "./SongList";
import SongCard from "./SongCard";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div
      className={`p-4 w-40 gap-3 h-auto rounded-lg hover:bg-gray-800 shadow-xl flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-white hover:text-white cursor-pointer font-semibold">
        {name}
      </p>
      <p className="text-xl text-orange-500 hover:text-white ">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ user, song, allUsers, allArtists, allSongs, allAlbums }, dispatch] =
    useStateValue();
  const [filtereUsers, setFiltereUsers] = useState(null);

  const navigate = useNavigate();

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false,
    });
  };
  const SignMeOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
    closePlayer();
  };

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);

  return (
    <>
      <div className="w-full items-center gap-10 justify-evenly rounded-md  bg-gray-900 hover:bg-gray-800 flex flex-wrap py-2 text-white">
        <p>Welcome ! </p>
        <p className="text-white font-semibold"> {user?.user?.name}</p>
        <div className="w-120 p-4 items-center gap-22 justify-evenly flex flex-wrap py-2 text-white">
          <FaSignOutAlt></FaSignOutAlt>
          <img
            src={user?.user?.imageURL}
            className="w-10 min-w-[44px] object-cover hover:border rounded-full m-3 shadow-lg cursor-pointer "
            alt="Logo"
            referrerPolicy="no-referrer"
            onClick={SignMeOut}
          />
        </div>
      </div>
      <div className="w-full p-8 my-5 items-center justify-evenly flex flex-wrap">
        <DashboardCard
          icon={<GiLoveSong className="text-xl text-red-700" />}
          name={
            <button>
              <Link to="/songs">Songs</Link>
            </button>
          }
          count={allSongs?.length > 0 ? allSongs?.length : 0}
        />
        <DashboardCard
          icon={<RiUserStarFill className="text-xl text-green-700" />}
          name={
            <button>
              <Link to="/artist">Artist</Link>
            </button>
          }
          count={allArtists?.length > 0 ? allArtists?.length : 0}
        />
        <DashboardCard
          icon={<GiMusicalNotes className="text-xl text-red-700" />}
          name={
            <button>
              <Link to="/albums">Albums</Link>
            </button>
          }
          count={allAlbums?.length > 0 ? allAlbums?.length : 0}
        />
        <DashboardCard
          icon={<FaUsers className="text-xl text-blue-800" />}
          name={
            <button>
              <Link to="/user">Users</Link>
            </button>
          }
          count={filtereUsers ? filtereUsers?.length : allUsers?.length}
        />
      </div>

      <>
        <SongContainer data={allSongs ? allSongs : song} />
      </>
    </>
  );
};

export const SongContainer = ({ data, i }) => {
  return (
    <div className="flex w-full">
      <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
        {data &&
          data.map((song, i) => (
            <SongCard key={song._id} data={song} index={i} type="song" />
          ))}
      </div>
    </div>
  );
};

export default DashboardHome;
