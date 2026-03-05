import React, { useEffect, useState } from "react";
import { changingUserRole, getAllUsers, removeUser } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import moment from "moment";
import { BsTrash } from "react-icons/bs";
export const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).startOf("day").fromNow();

  //  Changing the role method: allows to change the roles beetwen "Member" or "admin" when You are admin. Defaulty after signing-up is successfull, User of Musicflew is set to be a "Member". Admin can change the role of User to "Admin" and then, User has the same managing tools as admin.

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  // DELETE USER FROM MONGO

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  return (
    <div className="w-[99%]">
      <motion.div
        key={index}
        className="relative w-full rounded-md flex item-center z-11 justify-between py-4 bg-gray-900 cursor-pointer hover:bg-gray-800 hover:shadow-md"
      >
        {/*  */}

        {/* MY FUNCTIONS */}
        {user?.user.role === "admin" && (
          <div className="">
            {data._id !== user?.user._id && (
              <motion.p
                whileTap={{ scale: 0.75 }}
                className="ml-1 text-[14px] text-white px-1 absolute text-center block items-center bg-pink-800 rounded-md hover:shadow-xl
               top-6 right-4 z-10 float-right"
                onClick={() => setIsUserRoleUpdated(true)}
              >
                {data.role === "admin" ? "Member" : "Admin"}
              </motion.p>
            )}
            {/* DELETE BUTTON */}
            {user?.user._id !== data._id && (
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="absolute left-4 w-8 h-8 top-6 rounded-md first-letter:flex items-center justify-center "
                onClick={() => deleteUser(data._id)}
              >
                <BsTrash className="text-2xl font-semibold text-pink-800 hover:text-pink-600" />
              </motion.div>
            )}
          </div>
        )}

        {/* here is place where user Image is displaying */}
        <div className="w-275 min-w-[160px] flex items-center justify-center">
          <img
            src={data.imageURL}
            referrerPolicy="no-refferer"
            alt=""
            className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
          />
        </div>

        <p className="text-base text-white w-275 min-w-[160px] flex items-center justify-center text-center">
          {data.name}
        </p>
        <p className="text-base text-white w-275 min-w-[160px] text-center flex items-center justify-center">
          {data.email}
        </p>
        <p className="text-base text-white w-275 min-w-[160px] text-center flex items-center justify-center">
          {data.email_verfied ? "True" : "False"}
        </p>
        <p className="text-base text-white w-275 min-w-[160px] text-center flex items-center justify-center">
          {createdAt}
        </p>
        <div className="w-275 min-w-[160px] bottom-2 text-center flex items-center justify-center">
          <p className="text-[16px] text-white font-semibold">{data.role}</p>

          {/* Pop-up with question about changing the user's roles */}

          {isUserRoleUpdated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="h-30 m-2 w-32 absolute items-center text-center py-2 justify-center top-2 right-8 z-20 bg-gray-700 shadow-xl rounded-md"
            >
              <p className="text-white py-4 text-[14px] font-semibold ">
                Are you sure, you want mark the user as
                <span>{data.role === "admin" ? " Member" : " Admin"}</span>?
              </p>

              {/* YES button */}

              <motion.button
                whileTap={{ scale: 0.75 }}
                className="float-left outline-none border-none ml-2 items-center text-sm my-1 px-4 py-1 rounded-md
               bg-green-200 font-semibold text-black hover:shadow-md"
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                Yes
              </motion.button>

              {/* NO button */}

              <motion.button
                whileTap={{ scale: 0.75 }}
                className="float-right outline-none border-none text-sm mr-2 my-1 px-4 py-1 rounded-md
               bg-red-300 font-semibold text-black hover:shadow-md"
                onClick={() => setIsUserRoleUpdated(false)}
              >
                No
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const DashboardUser = () => {
  // const [emailFilter, setEmailFilter] = useState("");
  // const [isFocus, setIsFocus] = useState(false);

  const [filtereUsers, setFiltereUsers] = useState(null);

  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);

  return (
    <div className="flex w-[99%]">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-full flex justify-center items-center gap-24"></div>

        <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-900 rounded-md gap-3">
          <div className="text-base absolute top-4 left-4">
            <p className="text-base font-bold text-white">
              <span className="text-base text-white">Count : </span>
              {filtereUsers ? filtereUsers?.length : allUsers?.length}
            </p>
          </div>

          <div className="ml-1 w-[98%] min-w-[250px] flex items-center justify-between">
            <p className=" text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Image
            </p>
            <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Name
            </p>
            <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Email
            </p>
            <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Verified
            </p>
            <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Created
            </p>
            <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">
              Role
            </p>{" "}
          </div>
          {allUsers &&
            allUsers?.map((data, i) => (
              <DashboardUserCard data={data} key={data._id} index={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
