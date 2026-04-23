import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";
import { LoginBg } from "../assets/video";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  // Funkcja do obsługi powrotu z przekierowania
  const processUserData = async (firebaseUser) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      window.localStorage.setItem("auth", "true");

      const data = await validateUser(token);
      dispatch({
        type: actionType.SET_USER,
        user: data,
      });

      setAuth(true);
      navigate("/", { replace: true });
    }
  };

  // 1. Obsługa powrotu z przekierowania Google
  useEffect(() => {
    getRedirectResult(firebaseAuth)
      .then((result) => {
        if (result?.user) {
          processUserData(result.user);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas logowania (Redirect):", error);
      });
  }, []);

  // 2. Jeśli użytkownik jest już zalogowany (odświeżenie strony)
  useEffect(() => {
    const isAuth = window.localStorage.getItem("auth");
    if (isAuth === "true") {
      // Sprawdzamy czy firebaseAuth już ma użytkownika
      const unsubscribe = firebaseAuth.onAuthStateChanged((userCred) => {
        if (userCred) {
          processUserData(userCred);
        } else {
          // Jeśli localStorage mówi true, ale Firebase nie widzi sesji
          window.localStorage.setItem("auth", "false");
        }
        unsubscribe();
      });
    }
  }, []);

  // 3. Wyzwalacz logowania
  const loginWithGoogle = async () => {
    await signInWithRedirect(firebaseAuth, provider);
  };

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
