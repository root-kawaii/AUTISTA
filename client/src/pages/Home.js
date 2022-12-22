import React, {useEffect, useState} from "react";
import "./Home.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Home(){

  const navigate = useNavigate();

  const navigateJoin = () => {
    // 👇️ navigate to /
    navigate('/join');
  };

    const navigateCreate = () => {
    // 👇️ navigate to /
    navigate('/create');
  };


  return(
      <div className="Home-header">
        <text>Benvenuti al progetto Comutti II</text>
        <div className="buttons">
          <Button onClick={navigateJoin} variant='contained'>Join</Button>
            <Button onClick={navigateCreate} variant='contained'>Create</Button>
        </div>
      </div>
  )
}

export default Home;