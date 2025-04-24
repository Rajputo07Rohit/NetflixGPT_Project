import React from "react";
import {signOut } from "firebase/auth";
import { auth } from "../utilis/firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../utilis/Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();


  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
      
      nav("/")
    }).catch((error) => {
      // An error happened.
      nav("/error")
    });
  }
  return (
    <div className="flex absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10  justify-between ">

      <img
      className="w-44"
       src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
       alt="logo"
      />
      <div className="flex p-2 "> 
        <img 
        className="w-12 h-12 "
        alt="usericon" 
        src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
        />
          <button onClick={handleSignOut} className="rounded-lg font-bold text-white cursor-pointer">Sign out</button>
      </div>
    
    </div>
  );
};

export default Header;
