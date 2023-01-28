import React, {useEffect, useState,useContext,Text} from "react";
import "./TestUI.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../App.css";
import WebSocketCall from "../components/WebSocketCall";
import { io } from "socket.io-client";
import {socket, SocketContext} from '../components/socketto';

//import images
import dino from '../Assets/Subjects/dino_AUI_old.png';
import prince from '../Assets/Subjects/prince_AUI_old.jpg';
import rocket from '../Assets/Subjects/Rocket_old.png';

import penguin from '../Assets/Events/Penguin_old.png';
import archer from '../Assets/Places/Archer_old.png';
import ball from '../Assets/Places/Basketball_old.jpg';

import wave from '../Assets/Events/Wave_old.png';
import fidel from '../Assets/Events/Wave_old.png';
import iusearchbtw from '../Assets/Places/I_Use_Arch_BTW_old.png';
import {ButtonBase} from "@mui/material";




function TestUI(){

    const [data, setData] = useState({
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSelection, setIsSelection] = useState(true);
  const [err, setErr] = useState("");
  const [pick, setPick] = useState(0);
  const [socketInstance, setSocketInstance] = useState("  ");
  const [loading, setLoading] = useState(false);

  const [hastoPull,setPullState] = useState(true)
  const [messages, setMessages] = useState({
    page: 0,
    keys: [],
    audio_keys: [],
    text_keys: []
  });
  const [pager, setPage] = useState(0)
  const socket = useContext(SocketContext);
  console.log(socket)

  const subjects = [dino, prince, rocket];
  const places = [penguin, archer, ball];
  const events = [wave, fidel, iusearchbtw];
  const pages = [subjects, places, events];
  let picked = dino;
  let set = pages[0];

  const chosenImage =(pick) =>{
    picked = set[pick];
  }

  const setStates = () => {
    setPullState(true)
    setLoading(false)
    if (socket) {

      socket.on("connect", (data) => {
        setMessages({
          keys: data.keys,
          audio_keys : data.story_audio,
          text_keys: data.story_texts
      });
        });
      }

    setLoading(true)
    setPullState(false)
  }

  const setImageSet =(setNumber) => {
    set = pages[setNumber];
  }

  const progress = () =>{
    console.log(pager)
    setPage(pager + 1)
    setImageSet(pager);
    console.log(pager)
    socket.emit("data",pager);
  }


  const endConnection = () => {
    return function cleanup() {
      socket.disconnect();
    };
  }

  const navigate = useNavigate();

  const navigateCreation = () => {
    // 👇️ navigate to /
    navigate('/join');
  };


  // load initial state
  useEffect(setStates, []);



  return(
      <div className="TestUI">
          <header className="TestUI-header">
            {err ? (
              <h2>{err.message}</h2>
            ) : isLoading ? (
              <h2>loading... </h2>
            ) : isSelection ? (
              <>
                <div className="row">
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(0);
                      }}
                      src={dino}
                      alt="Immagine 1"
                    ></img>

                  </div>
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(1);
                      }}
                      src={prince}
                      alt="Immagine 2"
                    ></img>
                  </div>
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(2);
                      }}
                      src={rocket}
                      alt="Immagine 3"
                    ></img>
                  </div>
                </div>
                <div className="row">
                    <Button variant="contained" onClick={navigateCreation}>Esci</Button>
                </div>
                {/* update every click... */}
                {/* <button onClick={fetchImages}>next page!</button> */}
                {/* <AudioPlayer
                  url={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"
                  }
                />
                <AudioRecorder /> */}
              </>
            ) : (
              <>
                {/*chosen image displayed */}

                  <div className="row">
                    <div className="chosenImageColumn">
                    <img
                      onClick={() => {
                        //Add animations
                        progress(); //TODO Progress only if correct word is said
                        setIsSelection(true);
                      }}
                      src={
                        picked
                      }
                      alt="Immagine 1"
                    ></img>
                  </div>
                  <div className="row">

                  </div>
                </div>
                <div className="row">
                  <div className="column">
                      <text>
                        {messages.text_keys[pick]}
                      </text>
                    </div>
                </div>
                <div className="row">
                  {/*
                      <AudioPlayer
                        url={"https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.audio_keys[pick+1]}
                      />
                    */}
                </div>
                <div className="row">
                    {/* <AudioRecorder /> */}
                </div>
                <div className="row">
                    <Button variant="contained" onClick={navigateCreation}>Esci</Button>
                </div>
                {/* update every click... */}
                {/* <button onClick={fetchImages}>next page!</button> */}
              </>
            )}

          </header>
      </div>
  )
}

export default TestUI;
