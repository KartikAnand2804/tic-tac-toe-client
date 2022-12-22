import React from "react";
import { Navigate } from "react-router";

function Game({ cookies, client, setIsAuth }) {
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("name");
    cookies.remove("username");
    cookies.remove("email");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
    <Navigate to="/login" />;
  };

  return (
    <div>
      Game
      <button onClick={logOut}>logout</button>
    </div>
  );
}

export default Game;
