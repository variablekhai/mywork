import React from "react";
import { useUserAuth } from "../context/UserAuthContext";

function Home() {
  const { user, logOut } = useUserAuth();
  console.log(user);
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
      <div>Home Page { user && user.email} <button onClick={handleLogOut}>Log Out</button></div>
  )
}

export default Home;
