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
import { UserAvatar } from "../utilis/constant";

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
          className="h-dvh"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="lg:w-3/12  md:w-2/4 sm:w-1/2 absolute p-12 bg-black/85 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-50"
      >
        <h1 className="font-bold  text-3xl py-4">
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
