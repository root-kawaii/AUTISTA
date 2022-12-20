import React, {useEffect, useState,useContext,Text} from "react";
import "./Session.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../App.css";
import WebSocketCall from "../components/WebSocketCall";
import { io } from "socket.io-client";
import {socket, SocketContext} from '../components/socketto';




function Session(){


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


  const progress = () =>{
    console.log(messages)
    setPage(pager==0 ? 1 : pager + 1)
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
      <div className="Session">
          <header className="Session-header">
            {err ? (
              <h2>{err.message}</h2>
            ) : isLoading ? (
              <h2>loading... </h2>
            ) : isSelection ? (
              <>
                <p>name: {data.name}</p>
                <p>age: {data.age}</p>
                <div className="row">
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(0);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[1]
                      }
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
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[2]
                      }
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
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[3]
                      }
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
              
                <p>name: {data.name}</p>
                <p>age: {data.age}</p>
                <div className="row">
                  <div className="column">
                    <img
                      onClick={() => {
                        progress();
                        setIsSelection(true);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[pick + 1]
                      }
                      alt="Immagine 1"
                    ></img>
                  </div>
                  <div className="column">
                      <text>
                        {messages.text_keys[pick]}
                      </text>
                    </div>
                </div>
                <div className="row">
                    <AudioPlayer
                        url={"https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.audio_keys[pick]}
                    />
                </div>
                <div className="row">
                    <AudioRecorder />
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

export default Session;


