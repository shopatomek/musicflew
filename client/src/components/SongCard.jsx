import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { storage } from "../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

const SongCard = ({ data, index, type }) => {
  //
  const [isDelete, setisDelete] = useState(false);
  const [
    { songIndex, isSongPlaying },
    dispatch,
  ] = useStateValue();
  //

  const deleteData = (data) => {
    const deletedThisData = () => {
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

    //

    const deleteRef = ref(storage, data.imageURL);
    deleteObject(deleteRef).then(() => {});

    // DELETE ALBUM

    deleteAlbumById(data._id).then((res) => {
      if (res.data) {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
          deletedThisData();
        });
      }
    });

    // DELETE ARTIST

    deleteArtistById(data._id).then((res) => {
      if (res.data) {
        getAllArtists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.data,
          });
          deletedThisData();
        });
      }
    });

    // DELETE SONG

    deleteSongById(data._id).then((res) => {
      if (res.data) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.song,
          });
          deletedThisData();
        });
      }
    });
  };

  const addContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <motion.div
      className="relative w-60 max-h-[300px] min-w-210 px-2 py-4 cursor-pointer hover:bg-gray-800 bg-gray-900 text-white  shadow-md rounded-md flex flex-col items-center"
      onClick={type === "song" && addContext}
    >
      <div className="w-40 min-w-[180px] h-40 min-h-[180px] rounded-lg drop-shadow-lg relative overflow-hidden">
        {/* images which are fetched to the song card from firebase */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      <p className="text-base text-center text-white my-1">
        {data.name.lenght > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-white font-semibold my-2 py-0">
            {data.artist.lenght > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>

      <div className="absolute items-center bottom-1">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base items-center text-pink-800 drop-shadow-md hover:text-pink-700 py-2"
          onClick={() => setisDelete(true)}
        >
          <IoTrash className="text-xl" />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div className="absolute inset-0 backdrop-blur-md flex items-center flex-col justify-center px-4 py-2 rounded-md">
          <p className="text-xl text-white font-bold text-center">
            Are you sure do you want to delete this song ?
          </p>
          <div className="flex items-center gap-4 py-4">
            {/* YES BUTTON */}
            <motion.button
              whileTap={{ scale: 0.75 }}
              className=" float-left outline-none border-none text-sm px-6 py-1 rounded-md
               bg-green-400 text-black hover:bg-green-500 "
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>

            {/* NO BUTTON */}
            <motion.button
              onClick={() => setisDelete(false)}
              whileTap={{ scale: 0.75 }}
              className="float-right outline-none border-none text-sm px-6 py-1 rounded-md
               bg-red-400 text-black text-bold hover:animate-pulse"
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
