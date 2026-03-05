import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function FilterButtons({ filterData, flag }) {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [dispatch] =
    useStateValue();

  const updateFilterButton = (name) => {
    setFilterMenu(false);
    setFilterName(name);

    if (flag === "Artist") {
      dispatch({
        type: actionType.SET_ARTIST_FILTER,
        artistFilter: name,
      });
    }

    if (flag === "Albums") {
      dispatch({
        type: actionType.SET_ALBUM_FILTER,
        albumFilter: name,
      });
    }
    if (flag === "Language") {
      dispatch({
        type: actionType.SET_LANGUAGE_FILTER,
        languageFilter: name,
      });
    }
    if (flag === "Category") {
      dispatch({
        type: actionType.SET_FILTER_TERM,
        filterTerm: name,
      });
    }
  };
  return (
    <div className="border border-gray-400 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-700">
      <p
        className="text-base tracking-wide text-white flex items-center gap-2"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.lenght > 15
              ? `${filterName.slice(0, 14)}...`
              : filterName}
          </>
        )}

        {/* Icon which is rotating after click */}
        <IoChevronDown
          className={`text-base text-pink-800 duration-200 transition-all ease-in-out ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="text-base w-48 z-50 backdrop:backdrop-blur-sm max-h-44 overflow-y-scroll py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0  "
          //   Display imageURL for Artists and Albums
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              className="flex items-center gap-2 px-4 py-1 hover:bg-gray-900 "
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artist" || flag === "Albums") && (
                <img
                  src={data.imageURL}
                  alt=""
                  className="w-8 min-w-[32px] h-8 object-cover border-gray-900"
                />
              )}
              <p className="w-full">
                {data.name.lenght > 15
                  ? `${data.name.slice(0, 15)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default FilterButtons;
