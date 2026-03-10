import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete, MdMusicNote, MdPerson, MdAlbum } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { useLocation } from "react-router-dom";
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

const TABS = [
  { id: "song", label: "Song", icon: MdMusicNote },
  { id: "artist", label: "Artist", icon: MdPerson },
  { id: "album", label: "Album", icon: MdAlbum },
];

function DashboardNewSong() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.section || "song");

  // Song state
  const [songName, setsongName] = useState("");
  const [songImageCover, setsongImageCover] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(0);
  const [isImageloading, setisImageloading] = useState(false);
  const [audioImageCover, setaudioImageCover] = useState(null);
  const [audioUploadingProgress, setaudioUploadingProgress] = useState(0);
  const [isAudioLoading, setisAudioLoading] = useState(false);

  // Artist state
  const [artistImageCover, setartistImageCover] = useState(null);
  const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
  const [isArtistUploading, setisArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");

  // Album state
  const [albumImageCover, setalbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [
    {
      allArtists,
      allAlbums,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) =>
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.data }),
      );
    }
    if (!allAlbums) {
      getAllAlbums().then((data) =>
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album }),
      );
    }
  }, []);

  useEffect(() => {
    if (location.state?.section) setActiveTab(location.state.section);
  }, [location.state]);

  const showAlert = (type) => {
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: type });
    setTimeout(
      () => dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null }),
      4000,
    );
  };

  // ── Save Song ─────────────────────────────────────────────────────────────
  const saveSong = () => {
    if (!songName) {
      showAlert("danger");
      return;
    }
    setisAudioLoading(true);
    setisImageloading(true);

    saveNewSong({
      name: songName,
      imageURL: songImageCover || "",
      songURL: audioImageCover || "",
      album: albumFilter || "",
      artist: artistFilter || "Unknown",
      language: languageFilter || "Other",
      category: filterTerm || "all",
    }).then(() => {
      getAllSongs().then((s) =>
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: s.song }),
      );
    });

    showAlert("success");
    setsongName("");
    setisAudioLoading(false);
    setisImageloading(false);
    setsongImageCover(null);
    setaudioImageCover(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  // ── Save Artist ───────────────────────────────────────────────────────────
  const saveArtist = () => {
    if (!artistName) {
      showAlert("danger");
      return;
    }
    setisArtistUploading(true);

    saveNewArtist({ name: artistName, imageURL: artistImageCover || "" }).then(
      () => {
        getAllArtists().then((d) =>
          dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: d.data }),
        );
      },
    );

    showAlert("success");
    setisArtistUploading(false);
    setartistImageCover(null);
    setArtistName("");
  };

  // ── Save Album ────────────────────────────────────────────────────────────
  const saveAlbum = () => {
    if (!albumName) {
      showAlert("danger");
      return;
    }
    setIsAlbumUploading(true);

    saveNewAlbum({ name: albumName, imageURL: albumImageCover || "" }).then(
      () => {
        getAllAlbums().then((d) =>
          dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: d.album }),
        );
      },
    );

    showAlert("success");
    setIsAlbumUploading(false);
    setalbumImageCover(null);
    setAlbumName("");
  };

  return (
    <div className="flex w-full bg-black text-white">
      {/* ── Create form ── */}
      <div className="flex-1 px-8 py-8 max-w-xl">
        {/* Tab bar */}
        <div className="flex items-center gap-1 p-1 bg-[#1a1a1a] rounded-lg w-fit mb-8 border border-white/10">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === id
                  ? "bg-white text-black shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="text-base" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ════ SONG ════════════════════════════════════════════════ */}
          {activeTab === "song" && (
            <motion.div
              key="song"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-xl tracking-tight">Add a Song</h2>

              <input
                type="text"
                placeholder="Song title"
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                value={songName}
                onChange={(e) => setsongName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2">
                <FilterButtons filterData={allArtists} flag={"Artist"} />
                <FilterButtons filterData={allAlbums} flag={"Albums"} />
                <FilterButtons
                  filterData={filterByLanguage}
                  flag={"Language"}
                />
                <FilterButtons filterData={filters} flag={"Category"} />
              </div>

              <UploadField
                label="Cover image"
                height="h-36"
                isLoading={isImageloading}
                progress={imageUploadProgress}
                url={songImageCover}
                onClear={() => setsongImageCover(null)}
                isImage={true}
                updateState={setsongImageCover}
                setProgress={setimageUploadProgress}
                setIsLoading={setisImageloading}
              />

              <UploadField
                label="Audio file"
                height="h-24"
                isLoading={isAudioLoading}
                progress={audioUploadingProgress}
                url={audioImageCover}
                onClear={() => setaudioImageCover(null)}
                isImage={false}
                updateState={setaudioImageCover}
                setProgress={setaudioUploadingProgress}
                setIsLoading={setisAudioLoading}
                isAudio={true}
              />

              <SaveButton
                onClick={saveSong}
                disabled={isImageloading || isAudioLoading}
                label="Save Song"
              />
            </motion.div>
          )}

          {/* ════ ARTIST ══════════════════════════════════════════════ */}
          {activeTab === "artist" && (
            <motion.div
              key="artist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-xl tracking-tight">Add an Artist</h2>

              <input
                type="text"
                placeholder="Artist name"
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />

              <UploadField
                label="Artist photo"
                height="h-48"
                isLoading={isArtistUploading}
                progress={artistUploadingProgress}
                url={artistImageCover}
                onClear={() => setartistImageCover(null)}
                isImage={true}
                updateState={setartistImageCover}
                setProgress={setartistUploadingProgress}
                setIsLoading={setisArtistUploading}
              />

              <SaveButton
                onClick={saveArtist}
                disabled={isArtistUploading}
                label="Save Artist"
              />
            </motion.div>
          )}

          {/* ════ ALBUM ═══════════════════════════════════════════════ */}
          {activeTab === "album" && (
            <motion.div
              key="album"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-5"
            >
              <h2 className="text-xl tracking-tight">Add an Album</h2>

              <input
                type="text"
                placeholder="Album name"
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
              />

              <UploadField
                label="Album cover"
                height="h-48"
                isLoading={isAlbumUploading}
                progress={albumUploadingProgress}
                url={albumImageCover}
                onClear={() => setalbumImageCover(null)}
                isImage={true}
                updateState={setalbumImageCover}
                setProgress={setAlbumUploadingProgress}
                setIsLoading={setIsAlbumUploading}
              />

              <SaveButton
                onClick={saveAlbum}
                disabled={isAlbumUploading}
                label="Save Album"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Reusable upload field ────────────────────────────────────────────────────
const UploadField = ({
  label,
  height,
  isLoading,
  progress,
  url,
  onClear,
  isImage,
  updateState,
  setProgress,
  setIsLoading,
  isAudio = false,
}) => (
  <div>
    <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2 font-semibold">
      {label}{" "}
      <span className="text-gray-700 normal-case tracking-normal font-normal">
        (optional)
      </span>
    </p>
    <div
      className={`${height} rounded-xl border-2 border-dashed border-white/10 overflow-hidden bg-[#111]`}
    >
      {isLoading ? (
        <FileLoader progress={progress} />
      ) : !url ? (
        <FileUploader
          updateState={updateState}
          setProgress={setProgress}
          isLoading={setIsLoading}
          isImage={isImage}
        />
      ) : isAudio ? (
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <audio src={url} controls className="w-full" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 transition-colors"
          >
            <MdDelete className="text-white text-base" />
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img src={url} alt="Logo" className="w-full h-full object-cover" />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 transition-colors"
          >
            <MdDelete className="text-white text-base" />
          </button>
        </div>
      )}
    </div>
  </div>
);

// ── Save button ──────────────────────────────────────────────────────────────
const SaveButton = ({ onClick, disabled, label }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    disabled={disabled}
    className="w-full py-3 rounded-full bg-green-500 hover:bg-green-400 text-black font-bold text-sm tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {disabled ? "Uploading…" : label}
  </motion.button>
);

// ── Progress loader ──────────────────────────────────────────────────────────
export const FileLoader = ({ progress }) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-8">
    <ProgressBar
      completed={Math.min(Number(progress.toFixed(0)), 99)}
      maxCompleted={100}
      width="100%"
      height="4px"
      borderRadius="4px"
      labelSize="0px"
      bgColor="#22c55e"
      baseBgColor="#2a2a2a"
      transitionDuration="0.3s"
    />
    <p className="text-xs text-gray-500">{Math.round(progress)}% uploaded</p>
  </div>
);

// ── Cloudinary uploader ──────────────────────────────────────────────────────
export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const [{}, dispatch] = useStateValue();

  const uploadFile = async (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const resourceType = isImage ? "image" : "video";

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "musicflew");

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100);
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          updateState(response.secure_url);
          isLoading(false);
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
          setTimeout(
            () =>
              dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null }),
            4000,
          );
        } else {
          isLoading(false);
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
        }
      };

      xhr.onerror = () => {
        isLoading(false);
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      isLoading(false);
    }
  };

  return (
    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors gap-2">
      <BiCloudUpload className="text-3xl text-gray-600" />
      <p className="text-xs text-gray-600">
        Click to upload {isImage ? "image" : "audio"}
      </p>
      <input
        type="file"
        accept={isImage ? "image/*" : "audio/*"}
        className="hidden"
        onChange={uploadFile}
      />
    </label>
  );
};

export const DisableButton = () => (
  <button
    disabled
    className="w-full py-3 rounded-full bg-gray-800 text-gray-500 font-bold text-sm cursor-not-allowed"
  >
    Uploading…
  </button>
);

export default DashboardNewSong;
