import React, { useEffect } from "react";
import { getAllAlbums } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

function DashboardAlbums() {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center py-1 justify-center flex-col">
      <div className="relative w-full my-4 p-4 py-6 border border-gray-800 rounded-md">
        <span className="text-base text-white">Count : </span>
        {allAlbums?.length > 0 ? allAlbums?.length : 0}
        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  );
}

export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-ful flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="album" />
        ))}
    </div>
  );
};

export default DashboardAlbums;
