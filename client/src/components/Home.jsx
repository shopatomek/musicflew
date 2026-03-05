import React from "react";
import Header from "./Header";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardArtist from "./DashboardArtist";
import DashboardAlbums from "./DashboardAlbums";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import DashboardHome from "./DashboardHome";
import DashboardNewSong from "./DashboardNewSong";
import Alert from "./Alert";
import { useStateValue } from "../context/StateProvider";
import Contact from "./Contact";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";

// Home screen of the app. Avaible on port 3000.

const Home = () => {
  const [{ alertType }] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center text-white hover:text-gray-300  bg-black">
      <Header />
      <div className="w-[60%] my-2 text-white hover:text-gray-400 p-4 flex items-center justify-evenly ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-white hover:text-gray-300" />
        </NavLink>

        <NavLink
          to={"/user"}
          className="flex flex-wrap gap-2 text-white hover:text-gray-400"
        >
          {<FaUsers className="text-xl text-blue-700 " />}
          Users
        </NavLink>

        <NavLink
          to={"/songs"}
          className="flex flex-wrap gap-2 text-white hover:text-gray-400"
        >
          <GiLoveSong className="text-xl text-pink-700" />
          Songs
        </NavLink>

        <NavLink
          to={"/artist"}
          className="flex flex-wrap gap-2 text-white hover:text-gray-400"
        >
          {<RiUserStarFill className="text-xl text-green-700" />}
          Artist
        </NavLink>

        <NavLink
          to={"/albums"}
          className="flex flex-wrap gap-2 text-white hover:text-gray-400"
        >
          {<GiMusicalNotes className="text-xl text-orange-700" />}
          Albums
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newSongs" element={<DashboardNewSong />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {alertType && <Alert type={alertType} />}
      <hr />
    </div>
  );
};

export default Home;
