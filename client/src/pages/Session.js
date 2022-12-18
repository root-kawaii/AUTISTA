import React, {useEffect, useState} from "react";
import "./Session.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../App.css";
import WebSocketCall from "../components/WebSocketCall";
import { io } from "socket.io-client";



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
    check: 0
  });
  const [pager, setPage] = useState(0)

  const setStates = () => {
    setPullState(true)
    setLoading(false)
    if (hastoPull === true) {
      var socket = io("http://127.0.0.1:5000", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });
  
      setSocketInstance(socket);
  
      socket.on("connect", (data) => {
        setMessages({
          page: 0,
          keys: data.keys,
          check : 10
      });
        });

        socket.on("disconnect", (data) => {
          console.log(data);
        });
  
        return function cleanup() {
          socket.disconnect();
        };
      }
    
    setLoading(true)
    setPullState(false)
  }

  const progress = () =>{
    setPage(pager + 1)
    socketInstance.emit("data",pager);
  }

  const navigate = useNavigate();

  const navigateCreation = () => {
    // 👇️ navigate to /
    navigate('/join');
  };


  // load initial state
  useEffect(setStates, []);

  console.log(socketInstance)

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
                      <br></br>
                      Eight million Shinto deities travel secretly throughout the
                      earth.<br></br>
                      Those modest gods touch us-- touch us and move on.
                    </text>
                    </div>
                </div>
                <div className="row">
                    <AudioPlayer
                        url={"https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"}
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


