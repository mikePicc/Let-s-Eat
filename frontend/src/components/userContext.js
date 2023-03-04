import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

const isAuthenticated = async () => {
  const settings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  try {
    const fetchResponse = await fetch(
      `http://localhost:4000/api/users/is-logged-in`,
      settings
    );
    const data = await fetchResponse.json();
    console.log("response data: ", data);
    return !!data
  } catch (e) {
    console.error(e);
    return false
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = await isAuthenticated();
      if (cuser === null) {
        localStorage.setItem("user", "");
        cuser = "";
      }

      setCurrentUser(cuser);
    };

    checkLoggedIn();
  }, []);

  console.log("usercontext", currentUser);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {/* TODO: Fix this so it doesn't require login to go to signup, by pass for now */}
      {children}
      {/* {currentUser ? children : <SignIn />} */}
    </UserContext.Provider>
  );
};

export default UserContext;
