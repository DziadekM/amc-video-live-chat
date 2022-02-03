import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import TestingPage from "./Testing/TestingPage";
import { connectWithSocketIOServer } from "./utils/wss";

import "./App.css";

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    //Definition der Routen (Navigation)
    <Router>
      <Routes>
        <Route exact path="/join-room" element={<JoinRoomPage />} />
        <Route exact path="/room" element={<RoomPage />} />
        <Route exact path="/" element={<IntroductionPage />} />
        <Route exact path="/testing" element={<TestingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
