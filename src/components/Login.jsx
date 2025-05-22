import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utilis/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utilis/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utilis/Redux/userSlice";
import { bg, UserAvatar } from "../utilis/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const Fullname = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const emailVal = email.current?.value || "";
    const passwordVal = password.current?.value || "";
    const fullnameVal = isSignInForm ? "" : Fullname.current?.value || "";
    console.log(fullnameVal);
    const message = checkValidData(emailVal, passwordVal, fullnameVal);
    setErrorMessage(message);
    if (message) return;
    // Sign In Sign Up Logic

    if (!isSignInForm) {
      // Sign Up Logic

      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullnameVal,
            photoURL: UserAvatar,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: UserAvatar,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className=" absolute ">
        <img
          className="h-screen object-cover "
          src={bg}
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full  md:w-2/4 sm:w-1/2 absolute p-8 md:p-12 bg-black/85 my-24 md:my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-50"
      >
        <h1 className="font-bold text-2xl  md:text-3xl py-4">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={Fullname}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full border rounded-lg "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full border rounded-lg  "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full border  rounded-lg"
        />
        <p className="text-red-500 font-bold  text-sm py-2 ">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "new to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
