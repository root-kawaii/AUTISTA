import React, {useEffect, useState} from "react";
import "./Home.css";
import AudioPlayer from "../components/AudioPlayer";
import AudioRecorder from "../components/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Home(){

  const navigate = useNavigate();

  const navigateJoin = () => {
    // 👇️ navigate to /
    navigate('/join');
  };




  return(
      <div className="Home-header">
        <text>Benvenuti al progetto Commutti II</text>
        <div className="buttons">
          <Button onClick={navigateJoin} variant='contained'>Join</Button>
        </div>
      </div>
  )
}

export default Home;