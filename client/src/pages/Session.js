import React, { useEffect, useState, useContext, Text } from "react";
import "./Session.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import "../AudioUtilities/AudioPlayer.css";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from "@mui/material/Button";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import WebSocketCall from "../components/WebSocketCall";
import { io } from "socket.io-client";
import { socket, SocketContext } from "../components/socketto";
import next_button from "../Assets/UI/next_button.png";
import booko from "../Assets/UI/book_button.png";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";

//#region MediaImport
//----Import section for images----//
//Import gifs
import princeGif from "../Assets/Gifs/principe.gif";
import spaceGif from "../Assets/Gifs/space.gif";
import dinoGif from "../Assets/Gifs/dino.gif";
import wizardGif from "../Assets/Gifs/mago.gif";
import princessGif from "../Assets/Gifs/princess.gif";
import rocketGif from "../Assets/Gifs/razzo.gif";
import castleGif from "../Assets/Gifs/castle.gif";
import dragonGif from "../Assets/Gifs/dragon.gif";
import forestGif from "../Assets/Gifs/forest.gif";
import treasureMapGif from "../Assets/Gifs/treasure_map.gif";

//import main images
import rocket from "../Assets/Subjects/Razzo0.png";
import dino from "../Assets/Subjects/Dinosauro0.png";
import princess from "../Assets/Subjects/Principessa0.png";

//import sceneries
import space from "../Assets/Places/Spazio0.png";
import arch from "../Assets/Places/I_Use_Arch_BTW_old.png";
import forest from "../Assets/Places/Foresta0.png";
import castle from "../Assets/Places/Castello0.png";

//import secondary characters
import treasure from "../Assets/Events/TreasureMap.png";
import dragon from "../Assets/Events/Drago1.png";
import wizard from "../Assets/Events/mago.png";

//import UI
import uiBackground from "../Assets/UI/pink_background_M.png";
import protagonista from "../Assets/UI/protagonista.png";
import { background } from "@chakra-ui/react";

//#endregion

function Session() {
  const [data, setData] = useState({
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSelection, setIsSelection] = useState(true);

  //This 3 const are used to store the choice during the game
  //pickMain saves the main character choice
  const [pickMain, setPickMain] = useState(0);
  //pickBackground saves the location choice
  const [pickBackground, setPickBackground] = useState(0);
  //pickAdventure saves the adventure choice
  const [pickAdventure, setPickAdventure] = useState(0);

  const [socketInstance, setSocketInstance] = useState("  ");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [hastoPull, setPullState] = useState(true);
  const [messages, setMessages] = useState({
    page: 0,
    keys: [],
    audio_keys: [],
    text_keys: [],
  });
  const [pager, setPage] = useState(0);
  const socket = useContext(SocketContext);
  console.log(socket);

  //Online is used to change between local images and server images
  const [online, setOnline] = useState(false);
  //animatedMain is used to animate the main character chosen. with true the gif is displayed
  const [animatedMain, setAnimatedMain] = useState(false);
  //animatedSecondary is used to animate the secondary character chosen. with true the gif is displayed
  const [animatedSecondary, setAnimatedSecondary] = useState(false);

  //Arrays used to store all the location.
  //For the future to automate and randomize the game we just need to populate this arrays with the server generated images
  //Array containing the 3 main character choices
  const arrayMain = [dino, princess, rocket];

  //Array with the gifs of the 3 main character choices
  const arrayMainGif = [dinoGif, princessGif, rocketGif];

  //Array containing the 3 location choices
  const arrayBackground = [space, castle, forest];

  //Array with the gifs of the 3 locations choices
  const arrayBackgroundGif = [spaceGif, castleGif, forestGif];

  //Array containing the 3 secondary character choices
  const arrayAdventure = [dragon, treasure, wizard];

  //Array with the gifs of the 3 secondary character choices
  const arrayAdventureGif = [dragonGif, treasureMapGif, wizardGif];

  //Array containing the 3 image arrays. It is used to decide at runtime which images to show according to Pager
  const arrayImages = [arrayMain, arrayBackground, arrayAdventure];

  const setStates = () => {
    setPullState(true);
    setLoading(false);
    if (socket) {
      setOnline("");
      socket.on("connect", (data) => {
        setMessages({
          keys: data.keys,
          audio_keys: data.story_audio,
          text_keys: data.story_texts,
          prev_images: data.prev_images,
        });
      });
      console.log(messages.keys[1]);
    }

    setLoading(true);
    setPullState(false);
  };

  const progress = () => {
    setIsSelection(true);
    console.log(pager);
    setPage(pager + 1);
    console.log(pager);
    socket.emit("data", { pager, pickMain });
  };

  const endConnection = () => {
    return function cleanup() {
      socket.disconnect();
    };
  };

  const navigate = useNavigate();

  const navigateCreation = () => {
    // 👇️ navigate to /
    navigate("/join");
  };

  // load initial state
  useEffect(setStates, []);

  //Function called on click to animate the main character image.
  //Sets the --animatedMain-- variable to true and calls a timeout to turn it back to false.
  const animateMainImage = () => {
    setAnimatedMain(true);
    setTimeout(() => {
      setAnimatedMain(false);
    }, 3000);
  };

  //Function called on click to animate the secondary character image.
  //Sets the --animatedSecondary-- variable to true and calls a timeout to turn it back to false.
  const animateSecondaryImage = () => {
    setAnimatedSecondary(true);
    setTimeout(() => {
      setAnimatedSecondary(false);
    }, 3000);
  };

  return (
    <div className="Session">
      <header className="Session-header">
        {/*<img src={uiBackground} className="uiBackground"/>*/}{" "}
        {/*TODO fix the background that covers everything except images*/}
        {err ? (
          <h2>{err.message}</h2>
        ) : isLoading ? (
          <h2>loading... </h2>
        ) : isSelection ? (
          <>
            <AudioPlayer
              className="chooseImagePanel"
              source={protagonista}
              key={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/protagonista.mp3"
              }
              url={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/protagonista.mp3"
              }
            ></AudioPlayer>
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 1.2, delay: 1 },
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLoading(true);
                setIsSelection(false);
                setIsLoading(false);
                {
                  /*Based on the iteration the choice is stored in the relative variable.
                        Pager = 0 character choice --> setPickMain,
                        Pager = 1 location choice --> setPickBackground,
                        Pager = 2 adventure (secondary) choice --> setPickAdventure
                        Sets the relative pick value to the chosen one to be displayed later
                        */
                }
                pager === 0
                  ? setPickMain(0)
                  : pager === 1
                  ? setPickBackground(0)
                  : setPickAdventure(0);
              }}
              //if the --online-- variable is true the images are fetched from the aws s3 bucket
              //if the --online-- variable is false the images are loaded from local storage
              src={
                online
                  ? "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                    messages.keys[1]
                  : arrayImages[pager][0]
              }
              alt="Immagine 1"
              className="imgLeft"
            ></motion.img>
            <AudioPlayer
              source={booko}
              key={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/dino gentile.mp3"
              }
              url={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/dino gentile.mp3"
              }
              className="buttonLeft"
            />
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 1.2, delay: 1.8 },
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLoading(true);
                setIsSelection(false);
                setIsLoading(false);
                {
                  /*Based on the iteration the choice is stored in the relative variable.
                        Pager = 0 character choice --> setPickMain,
                        Pager = 1 location choice --> setPickBackground,
                        Pager = 2 adventure (secondary) choice --> setPickAdventure
                        Sets the relative pick value to the chosen one to be displayed later
                        */
                }
                pager === 0
                  ? setPickMain(1)
                  : pager === 1
                  ? setPickBackground(1)
                  : setPickAdventure(1);
              }}
              //if the --online-- variable is true the images are fetched from the aws s3 bucket
              //if the --online-- variable is false the images are loaded from local storage
              src={
                online
                  ? "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                    messages.keys[2]
                  : arrayImages[pager][1]
              }
              alt="Immagine 2"
              className="imgCentral"
            ></motion.img>
            <AudioPlayer
              source={booko}
              key={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/rossina.mp3"
              }
              url={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/rossina.mp3"
              }
              className="buttonCentral"
            />
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 1.2, delay: 2.6 },
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLoading(true);
                setIsSelection(false);
                setIsLoading(false);
                {
                  /*Based on the iteration the choice is stored in the relative variable.
                        Pager = 0 character choice --> setPickMain,
                        Pager = 1 location choice --> setPickBackground,
                        Pager = 2 adventure (secondary) choice --> setPickAdventure
                        Sets the relative pick value to the chosen one to be displayed later
                        */
                }
                pager === 0
                  ? setPickMain(2)
                  : pager === 1
                  ? setPickBackground(2)
                  : setPickAdventure(2);
              }}
              //if the --online-- variable is true the images are fetched from the aws s3 bucket
              //if the --online-- variable is false the images are loaded from local storage
              src={
                online
                  ? "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                    messages.keys[3]
                  : arrayImages[pager][2]
              }
              alt="Immagine 3"
              className="imgRight"
            ></motion.img>
            <AudioPlayer
              source={booko}
              key={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Razzo pres.mp3"
              }
              url={
                "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Razzo pres.mp3"
              }
              className="buttonRight"
            />

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
          //From here is the code for displaying what the user has chosen during the session
          <>
            {/*First page, there is only the main character*/}
            {pager === 0 ? (
              <>
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  // whileTap={{ scale: 0.9 }}
                  src={
                    animatedMain ? arrayMainGif[pickMain] : arrayMain[pickMain]
                  }
                  className="onlyMainCharacter"
                  alt="wow"
                  onClick={() => animateMainImage()}
                ></motion.img>
                <Box className="textBox">
                  <text className="Session-text">BA</text>
                </Box>

                <AudioPlayer
                  source={booko}
                  key={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/dinosauro.mp3"
                  }
                  url={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/dinosauro.mp3"
                  }
                  className="storyPanelButton"
                />
                <AudioRecorder
                  className="audioRecorder"
                  imageName={arrayMain[pickMain]}
                />
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  src={next_button}
                  className="next_button"
                  onClick={progress}
                ></motion.img>
              </>
            ) : pager === 1 ? (
              <>
                {/*Second page, there is the main character on the background*/}
                <img
                  src={arrayBackgroundGif[pickBackground]}
                  alt="wow"
                  className="background"
                ></img>
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  // whileTap={{ scale: 0.9 }}
                  src={
                    animatedMain ? arrayMainGif[pickMain] : arrayMain[pickMain]
                  }
                  className="overLeft"
                  alt="wow"
                  onClick={() => animateMainImage()}
                ></motion.img>
                <Box className="textBox">
                  <text className="Session-text">PIO</text>
                </Box>
                <AudioPlayer
                  source={booko}
                  key={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Castllo pio.mp3"
                  }
                  url={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Castllo pio.mp3"
                  }
                  className="storyPanelButton"
                />
                <AudioRecorder
                  className="audioRecorder"
                  imageName={arrayBackground[pickBackground]}
                />
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  src={next_button}
                  className="next_button"
                  onClick={progress}
                ></motion.img>
              </>
            ) : (
              <>
                {/*Third page, all three choices are displayed*/}
                <img
                  src={arrayBackgroundGif[pickBackground]}
                  alt="wow"
                  className="background"
                ></img>
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  // whileTap={{ scale: 0.9 }}
                  src={
                    animatedMain ? arrayMainGif[pickMain] : arrayMain[pickMain]
                  }
                  className="overLeft"
                  alt="wow"
                  onClick={() => animateMainImage()}
                ></motion.img>
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  // whileTap={{ scale: 0.9 }}
                  src={
                    animatedSecondary
                      ? arrayAdventureGif[pickAdventure]
                      : arrayAdventure[pickAdventure]
                  }
                  className="overRight"
                  alt="wow"
                  onClick={() => animateSecondaryImage()}
                ></motion.img>
                <Box className="textBox">
                  <text className="Session-text">EVVAI</text>
                </Box>
                <AudioPlayer
                  source={booko}
                  key={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Dinoeventtesoro.mp3"
                  }
                  url={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Dinoeventtesoro.mp3"
                  }
                  className="storyPanelButton"
                />
                <AudioRecorder
                  className="audioRecorder"
                  imageName={arrayAdventure[pickAdventure]}
                />
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  src={next_button}
                  className="next_button"
                  onClick={progress}
                ></motion.img>
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default Session;

//  {messages.prev_images.length!="placeholder" ? (                  <img src={"https://aui20222.s3.eu-central-1.amazonaws.com/" +
// messages.prev_images[0]}></img>):(<text>a</text>)}
// {messages.prev_images.length>1 ? (                  <img src={"https://aui20222.s3.eu-central-1.amazonaws.com/" +
// messages.prev_images[1]}></img>):(<text>b</text>)}
// <img src={animatedMain?(arrayMainGif[pickMain]):(arrayMain[pickMain])} class='over' alt='wow'
// onClick={()=> animateMainImage()}
