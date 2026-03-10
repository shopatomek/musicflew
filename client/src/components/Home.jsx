import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
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
import { MdLibraryMusic, MdPerson, MdAlbum, MdAdd } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import SidebarSongList from "./SidebarSongList";

const Home = () => {
  const [{ alertType }] = useStateValue();
  const [createOpen, setCreateOpen] = useState(false);
  const [songFilter, setSongFilter] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCreateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const createOptions = [
    {
      icon: <MdLibraryMusic className="text-base" />,
      label: "Song",
      description: "Add a new track",
      section: "song",
    },
    {
      icon: <MdPerson className="text-base" />,
      label: "Artist",
      description: "Add a new artist",
      section: "artist",
    },
    {
      icon: <MdAlbum className="text-base" />,
      label: "Album",
      description: "Add a new album",
      section: "album",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col text-white bg-black">
      <Header />

      {/* ── Top nav ── */}
      <div className="w-full px-6 py-2 flex items-center gap-4 border-b border-white/10">
        {/* Left: nav */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCreateOpen((p) => !p)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-black text-xl font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <MdAdd className="text-base" />
              Create
            </button>
            <AnimatePresence>
              {createOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 top-10 w-52 bg-[#282828] rounded-lg shadow-2xl overflow-hidden z-50 border border-white/10"
                >
                  {createOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => {
                        setCreateOpen(false);
                        navigate("/newSongs", {
                          state: { section: opt.section },
                        });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                    >
                      <span className="text-white/60">{opt.icon}</span>
                      <div>
                        <p className="text-base text-white leading-tight">
                          {opt.label}
                        </p>
                        <p className="text-base text-gray-400">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to={"/songs"}
            className="flex items-center gap-1.5 text-xl text-gray-400 hover:text-white transition-colors"
          >
            <GiLoveSong className="text-pink-500" />
            Songs
          </NavLink>
          <NavLink
            to={"/artist"}
            className="flex items-center gap-1.5 text-xl text-gray-400 hover:text-white transition-colors"
          >
            <RiUserStarFill className="text-green-500" />
            Artist
          </NavLink>
          <NavLink
            to={"/albums"}
            className="flex items-center gap-1.5 text-xl text-gray-400 hover:text-white transition-colors"
          >
            <GiMusicalNotes className="text-orange-500" />
            Albums
          </NavLink>
          <NavLink
            to={"/user"}
            className="flex items-center gap-1.5 text-xl text-gray-400 hover:text-white transition-colors"
          >
            <FaUsers className="text-blue-500" />
            Users
          </NavLink>
        </div>

        {/* Center: search bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-xl text-white placeholder-gray-600 outline-none focus:border-white/25 transition-colors"
              value={songFilter}
              onChange={(e) => setSongFilter(e.target.value)}
            />
            {songFilter && (
              <button
                onClick={() => setSongFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <AiOutlineClear className="text-lg" />
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0 w-32" />
      </div>

      {/* ── Main layout: sidebar + content ── */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 112px)" }}
      >
        {/* Persistent left sidebar */}
        <SidebarSongList filter={songFilter} />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route
              path="/"
              element={<DashboardHome songFilter={songFilter} />}
            />
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artist" element={<DashboardArtist />} />
            <Route path="/albums" element={<DashboardAlbums />} />
            <Route path="/newSongs" element={<DashboardNewSong />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>

      {alertType && <Alert type={alertType} />}
    </div>
  );
};

export default Home;
