// Importing modules
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import AudioRecorder from "./components/AudioRecorder";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import JoinSession from "./pages/JoinSession";
import CreateSession from "./pages/CreateSession";
import TutorMeeting from "./pages/TutorMeeting";
import Session from "./pages/Session";



function App() {

  return (
      <Router>
            <div className="App">
              {/*
              NavBar ci interessa?
              barra in alto con (esempio) contatti/credits/immagini e potenzialmente
              qualsiasi cosa utile acessibile senza login?
              */}
              <div className="content">
                  <Routes>
                      {/*
                      Insert here all the pages of the client
                      to add a page:
                      <Route path="/NEW_PAGE_URL" element={<JSX_FILENAME />} />
                      where
                      NEW_PAGE_URL is the name that we want at the end of the url
                      JSX_FILENAME is the name of the file in the PAGES FOLDER without .js
                      */}
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/session" element={<Session />} />
                      <Route path="/join" element={<JoinSession />} />
                      <Route path="/create" element={<CreateSession />} />
                      <Route path="/tutorMeeting/:sessionCode" element={<TutorMeeting />} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
