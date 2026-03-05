import React, { useEffect, useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import ProgressBar from "@ramonak/react-progress-bar";

// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

function DashboardNewSong() {
  // States for the uploaded image files
  const [songName, setsongName] = useState("");
  const [songImageCover, setsongImageCover] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(0);
  const [isImageloading, setisImageloading] = useState(false);
  // States for the audio files
  const [audioImageCover, setaudioImageCover] = useState(null);
  const [audioUploadingProgress, setaudioUploadingProgress] = useState(0);
  const [isAudioLoading, setisAudioLoading] = useState(false);

  const [artistImageCover, setartistImageCover] = useState(null);
  const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
  const [isArtistUploading, setisArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setalbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
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
  }, []);

  // orange pop-up when accessing the component

  useEffect(() => {
    if ((!songName, !songImageCover, !audioImageCover & setsongName(null))) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "warning",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 5000);
    }
  }, []);

  const deletedPopup = () => {
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

  // const successPopup = () => {
  //   dispatch({
  //     type: actionType.SET_ALERT_TYPE,
  //     alertType: "success",
  //   });
  //   setInterval(() => {
  //     dispatch({
  //       type: actionType.SET_ALERT_TYPE,
  //       alertType: null,
  //     });
  //   }, 4000);
  // };

  // Delete Song Image

  const deleteSongImage = (url, isImage) => {
    if (isImage) {
      setisImageloading(true);
      // POP-UP ALLERT
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      deletedPopup();
      setsongImageCover(null);
      setisImageloading(false);
    });
  };

  // Delete Audio File

  const deleteAudioFile = (url, isAudio) => {
    if (isAudio) {
      setisAudioLoading(true);
      // POP-UP ALLERT
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      // POP-UP ALLERT
      deletedPopup();
      setaudioImageCover(null);
      setisAudioLoading(false);
    });
  };

  // Delete Artist Image

  const deleteArtistImage = (url, isImage) => {
    if (isImage) {
      setisArtistUploading(true);
      // POP-UP ALLERT
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      // POP-UP ALLERT
      deletedPopup();
      setartistImageCover(null);
      setisArtistUploading(false);
    });
  };

  // Delete Album Image

  const deleteAlbumImage = (url, isImage) => {
    if (isImage) {
      setIsAlbumUploading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      // POP-UP ALLERT
      deletedPopup();
      setalbumImageCover(null);
      setIsAlbumUploading(false);
    });
  };

  // Save Song

  const saveSong = () => {
    if (
      !songImageCover &&
      !audioImageCover &&
      !songName &&
      songImageCover &&
      audioImageCover
        ? !songName
        : !songName
    ) {
      // POP-UP ALLERT
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setisAudioLoading(true);
      setisImageloading(true);

      const data = {
        name: songName,
        imageURL: songImageCover,
        songURL: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(data).then((res) => {
        getAllSongs().then((song) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: song.song,
          });
        });
      });

      // POP-UP ALLERT IF SUCCESS
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setsongName(null);
      setisAudioLoading(false);
      setisImageloading(false);
      setsongImageCover(null);
      setaudioImageCover(null);
      dispatch({
        type: actionType.SET_ARTIST_FILTER,
        artistFilter: null,
      });
      dispatch({
        type: actionType.SET_LANGUAGE_FILTER,
        languageFilter: null,
      });
      dispatch({
        type: actionType.SET_ALBUM_FILTER,
        albumFilter: null,
      });
      dispatch({
        type: actionType.SET_FILTER_TERM,
        filterTerm: null,
      });
    }
  };

  // Save Artist

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      // POP-UP ALLERT IF ANY ERROR OCCURS
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setisArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      };

      saveNewArtist(data).then((res) => {
        getAllArtists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.data,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setisArtistUploading(false);
      setartistImageCover("");
      setTwitter("");
      setInstagram("");
    }
  };

  // Save Album function

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      // POP-UP ALLERT
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsAlbumUploading(true);
      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };
      saveNewAlbum(data).then(() => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setIsAlbumUploading(false);
      setalbumImageCover(null);
      setAlbumName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-900 gap-4 rounded-md">
      <input
        type="text"
        placeholder="Name of the song..."
        className="w-full p-3 rounded-md text-base  text-white outline-none shadow-sm border border-gray-500 bg-transparent  hover:border-gray-700"
        value={songName}
        onChange={(e) => setsongName(e.target.value)}
      />
      {/* Filter Button component. Filter buttons functions are defined in the FilterButtons.jsx file */}
      <div className="flex w-full justify-between flex-wrap items-center gap-4 border-gray-800">
        <FilterButtons filterData={allArtists} flag={"Artist"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>
      {/* Image file Uploader */}

      <div className="bg-black backdrop-blur-sm w-full h-300 rounded-md border-2 border-gray-800 cursor-pointer">
        {isImageloading && <FileLoader progress={imageUploadProgress} />}
        {!isImageloading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setsongImageCover}
                setProgress={setimageUploadProgress}
                isLoading={setisImageloading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-xl duration-800 transition-all ease-in-out"
                  onClick={() => deleteSongImage(songImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio file uploading */}

      <div className="bg-black backdrop-blur-sm w-full h-300 rounded-md border-2 border-gray-800 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setaudioImageCover}
                setProgress={setaudioUploadingProgress}
                isLoading={setisAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio
                  src={audioImageCover}
                  className="text-white"
                  controls
                ></audio>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-xl duration-800 transition-all ease-in-out"
                  onClick={() => deleteAudioFile(audioImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Save button  */}

      <div className="flex items-center justify-center cursor-pointer w-60 p-4">
        {isImageloading || isAudioLoading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 h-9 bg-orange-600 text-white hover:shadow-lg"
            onClick={saveSong}
          >
            Save song
          </motion.button>
        )}
      </div>

      {/* Image uploader for ARTISTS */}

      <p className="font-semibold text-2xl">Artist Details</p>

      <div className="bg-black backdrop-blur-sm w-full h-300 rounded-md border-2 border-gray-800 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setartistImageCover}
                setProgress={setartistUploadingProgress}
                isLoading={setisArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-xl duration-800 transition-all ease-in-out"
                  onClick={() => deleteArtistImage(artistImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Artist Name */}
      <input
        type="text"
        placeholder="Artist name"
        className="w-full p-3 rounded-md text-base font-semibold text-white outline-none shadow-sm border  border-gray-500 bg-transparent  hover:border-gray-700"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      {/* Twitter */}
      <div className="flex items-center rounded-md p-3 border border-gray-800 w-full">
        <p className="text-base font-semibold text-gray-800">
          www.twitter.com/
        </p>
        <input
          type="text"
          placeholder="your twitter id"
          className="w-full text-base font-semibold outline-none bg-transparent"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>

      {/* Instagram */}
      <div className="flex items-center rounded-md p-3 border border-gray-800 w-full">
        <p className="text-base font-semibold text-gray-800">
          www.instagram.com/
        </p>
        <input
          type="text"
          placeholder="your instagram id"
          className="w-full text-base font-semibold outline-none bg-transparent"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>

      {/* SAVE BUTTON FOR ARTIST */}

      <div className="flex items-center justify-center cursor-pointer w-60 p-4">
        {isArtistUploading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 h-9 bg-orange-600 text-white hover:shadow-lg"
            onClick={saveArtist}
          >
            Save Artist
          </motion.button>
        )}
      </div>

      {/* Album informations */}
      <p className="font-semibold text-2xl">Album informations</p>

      <div className="bg-black backdrop-blur-sm w-full h-300 rounded-md border-2 border-gray-800 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setalbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-xl duration-800 transition-all ease-in-out"
                  onClick={() => deleteAlbumImage(albumImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ALBUM NAME */}

      <input
        type="text"
        placeholder="Album name.."
        className="w-full p-3 rounded-md text-base font-semibold text-white outline-none shadow-sm border  border-gray-500 bg-transparent  hover:border-gray-700"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />

      {/* SAVE ALBUM BUTTON */}

      <div className="flex items-center justify-center cursor-pointer w-60 p-4">
        {isAlbumUploading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 h-9 bg-orange-600 text-white  hover:shadow-lg"
            onClick={saveAlbum}
          >
            Save Album
          </motion.button>
        )}
      </div>
    </div>
  );
}

// Blue Loading... button

export const DisableButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800
      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
      text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600
      dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        aria-hidden="true"
        role="status"
        className="inline mr-3 w-4 h-4 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

// File Loader with progress bar

export const FileLoader = ({ progress }) => {
  return (
    <div className="w full h-full flex flex-col items-center justify-center bg-black text white">
      {/* <p className="text-2xl font-semibold text-textColor border-red"> */}

      <ProgressBar
        completed={progress.toFixed(0)}
        maxCompleted={95}
        width="260px"
        height="40px"
        borderRadius="8px"
        labelSize="20px"
        labelAlignment="center"
        bgColor="rgb(29 78 216 )"
        transitionDuration="0.5s"
      />
      {/* {Math.round(progress) > 0 && <> {`${Math.round(progress)}%`}</>} */}
      {/* </p> */}
      <div className="w-20 h-20 min-w-[40px] bg-red-800 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-800 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{}, dispatch] = useStateValue();
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    // console.log(uploadedFile);
    // isLoading(false);
    const storageRef = ref(
      storage,
      `${isImage ? "images" : "audio"}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        // IF ANY ERROR OCCURS DISPLAY DANGER

        console.log(error);
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });
        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 5000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        // IF SUCCESS CREATING DOWNLOAD URL DISPLAY SUCCESS GREEN ALERT
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });
        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg text-white">
            Click to upload {isImage ? "image cover" : "an audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export default DashboardNewSong;
