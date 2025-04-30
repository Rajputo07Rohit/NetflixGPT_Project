import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, addUser } from "../utilis/Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Logo, UserAvatar, } from "../utilis/constant";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
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

 
  return (
    <div className="flex absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10  justify-between ">
      <img
        className="w-44"
        src={Logo}
        alt="logo"
      />

      {user && (
        <div className="flex p-2 ">
          <img
            className="w-12 h-12 "
            alt="usericon"
            src={user.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="rounded-lg font-bold text-white cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
