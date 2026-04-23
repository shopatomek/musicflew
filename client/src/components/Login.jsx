import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";
import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div
          className="flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all duration-300 ease-in-out shadow-lg"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium tracking-wide">Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
