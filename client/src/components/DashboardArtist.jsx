import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllArtists } from "../api";
import SongCard from "./SongCard";

const DashboardArtist = () => {
  const [{ allArtists }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center py-1 justify-center flex-col">
      <div className="relative w-full my-4 p-4 py-6 border border-gray-800 rounded-md">
        <span className="text-base text-white">Count : </span>
        {allArtists?.length > 0 ? allArtists?.length : 0}
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly text-white">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="artist" />
        ))}
    </div>
  );
};
export default DashboardArtist;
