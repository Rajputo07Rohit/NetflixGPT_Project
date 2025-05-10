import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, addUser } from "../utilis/Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Logo, SUPPORTED_LANGUAGES } from "../utilis/constant";
import {toggleGptSearchView} from "../utilis/Redux/gptSlice"
import { changeLanguage } from "../utilis/Redux/configSlice";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.s
      })
      .catch((error) => {
        // An error happened.
        nav("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        nav("/browse");
        // ...
      } else {
        dispatch(removeUser());
        nav("/");
        // User is signed out
        // ...
      }
    });

    // unsubscribe  when component is unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
     console.log("ROhit click")
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
    <img className="w-44 mx-auto md:mx-0" src={Logo} alt="logo" />
    {user && (
      <div className="flex p-2 justify-between">
        {showGptSearch && (
          <select
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
        <button
          className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
          onClick={handleGptSearch}
        >
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>
        <img
          className="hidden md:block w-12 h-12"
          alt="usericon"
          src={user?.photoURL}
        />
        <button onClick={handleSignOut} className="font-bold text-white ">
          (Sign Out)
        </button>
      </div>
    )}
  </div>
  );
};

export default Header;
