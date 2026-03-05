import React from "react";
import { BsEmojiSunglassesFill, BsPen, BsStoplights } from "react-icons/bs";
import { motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ translateX: 200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 200, opacity: 0 }}
      key={type}
      className={`fixed top-16 right-12 p-4 rounded-md backdrop-blur-md
       items-center justify-center shadow-2xl
       ${type === "success" && "bg-green-400"}
       ${type === "danger" && "bg-red-400"}
       ${type === "deleted" && "bg-blue-500"}
       ${type === "warning" && "bg-orange-500"}
       ${type === "aDeleted" && "bg-violet-500"}
       ${type === "arDeleted" && "bg-pink-500"}
       ${type === "clickplus" && "bg-gray-800 border"}
       `}
      //  List below contains alerts that has'nt been fully deployed.
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglassesFill className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">Data saved</p>
        </div>
      )}
      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsStoplights className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">
            Please try again...
          </p>
        </div>
      )}
      {type === "deleted" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglassesFill className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">Data deleted !</p>
        </div>
      )}
      {type === "warning" && (
        <div className="flex items-center gap-4">
          <BsPen className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">
            Please type your song name first...
          </p>
        </div>
      )}
      {type === "aDeleted" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglassesFill className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">Album deleted !</p>
        </div>
      )}

      {type === "arDeleted" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiSunglassesFill className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">Artist deleted !</p>
        </div>
      )}
      {type === "clickplus" && (
        <div className="flex items-center justify-center gap-4">
          <IoAdd className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">
            Click Plus button to add new song
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
