export const checkValidData = (email, password, fullname) => {
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  
    const isFullNameValid = fullname
      ? /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(fullname)
      : true;
   console.log(fullname)
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";
    if (!isFullNameValid) return "Full Name is not valid";
  
    return null;
  };
  