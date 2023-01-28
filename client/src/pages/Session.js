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
import next_button from '../Assets/next_button.png'



//#region MediaImport
//----Import section for images----//
//Import gifs
import princeGif from '../Assets/Gifs/principe.gif'
import spaceGif from '../Assets/Gifs/space.gif'
import dinoGif from '../Assets/Gifs/dino.gif'
import wizardGif from '../Assets/Gifs/mago.gif'
import princessGif from '../Assets/Gifs/princess.gif'
import rocketGif from '../Assets/Gifs/razzo.gif'
import castleGif from '../Assets/Gifs/castle.gif'
import dragonGif from '../Assets/Gifs/dragon.gif'


//import main images
import rocket from '../Assets/Subjects/Razzo0.png'
import dino from '../Assets/Subjects/Dinosauro0.png'
import princess from '../Assets/Subjects/Principessa0.png'


//import sceneries
import space from '../Assets/Places/Spazio0.png'
import arch from '../Assets/Places/I_Use_Arch_BTW_old.png'
import castle from '../Assets/Places/Castello0.png'

//import secondary characters
import treasure from '../Assets/Events/TreasureMap.png'
//TODO add missing images

//#endregion

function Session(){


    const [data, setData] = useState({
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSelection, setIsSelection] = useState(true);
  const [pickMain, setPickMain] = useState(0);
  const [pickBackground, setPickBackground] = useState(0);
  const [pickAdventure, setPickAdventure] = useState(0);
  const [socketInstance, setSocketInstance] = useState("  ");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
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

  //Online is used to change between local images and server images
  const [online, setOnline] = useState(false);
  //animatedMain is used to animate the main character chosen. with true the gif is displayed
  const [animatedMain, setAnimatedMain] =useState(false);
  //animatedSecondary is used to animate the secondary character chosen. with true the gif is displayed
  const [animatedSecondary, setAnimatedSecondary] =useState(false);

  const arrayMain = [dino, princess, rocket];
  const arrayMainGif = [dinoGif, princessGif, rocketGif];
  const arrayBackground = [space, castle, space];
  const arrayBackgroundGif = [spaceGif, castleGif, spaceGif];
  const arrayAdventure = [treasure, treasure, treasure];
  const arrayAdventureGif = [treasure, treasure, treasure];


  

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
    setIsSelection(true);
    console.log(pager)
    setPage(pager + 1)
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

  const animateMainImage = () =>{
    setAnimatedMain(true);
    setTimeout(() => {
      setAnimatedMain(false);
      }, 3000);
  }



  return(
      <div className="Session">
          <header className="Session-header">
            {err ? (
              <h2>{err.message}</h2>
            ) : isLoading ? (
              <h2>loading... </h2>
            ) : isSelection ? (
              <>
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPickMain(0);
                      }}
                        src={online ? ("https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[1] ):(dino)}
                      alt="Immagine 1"
                      className="imgLeft"
                    ></img>
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPickMain(1);
                      }}
                      src={ online ? (
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[2]):(princess)
                      }
                      alt="Immagine 2"
                      className="imgCentral"
                    ></img>
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPickMain(2);
                      }}
                      src={ online ? ("https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.keys[3]):(rocket)
                      }
                      alt="Immagine 3"
                      className="imgRight"
                    ></img>
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
                {/* <div className="row"> */}
                  {/* <div className="column"> */}
                  {/* <img src={spaceGif} alt='wow' class='background'></img> */}
                  <img src={animatedMain?(arrayMainGif[pickMain]):(arrayMain[pickMain])} class='over' alt='wow'
                    onClick={()=> animateMainImage()}
                  ></img>
                  {/* </div> */}
                  <div className="column">
                      <text>
                        {messages.text_keys[pickMain]}
                      </text>
                    </div>
                {/* </div> */}
                <img src={next_button} class='next_button' onClick={progress}></img>
                <div className="row">
                    <AudioPlayer
                        url={"https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        messages.audio_keys[pickMain+1]}
                    />
                </div>
                <div className="row">
                      <AudioRecorder imageName={rocket}/>
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


