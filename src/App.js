import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Game from "./components/Game";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

function App() {
  const API_KEY = "5n5t8cfuy2f4";
  const client = StreamChat.getInstance(API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (token) {
      client
        .connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("name"),
            username: cookies.get("username"),
            email: cookies.get("email"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then((user) => {
          console.log(user);
          setIsAuth(true);
        });
    }
  });

  return (
    <div className="App">
      {isAuth ? <Navigate to="/game" /> : <Navigate to="/login" />}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          exact
          path="/game"
          element={
            <Game
              cookies={cookies}
              token={token}
              client={client}
              setIsAuth={setIsAuth}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
