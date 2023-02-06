import React, { useState, useEffect } from "react";
import { Button, cardActionAreaClasses } from "@mui/material";
import textToSpeech from "./TextToSpeech";
import TTS from "./TextToSpeech";
import booko from "../Assets/UI/book_button.png";
import "../AudioUtilities/AudioPlayer.css";
import { motion } from "framer-motion";
import protagonista from "../Assets/UI/protagonista.png";

const currentBaseUrl = "https://aui20222.s3.eu-central-1.amazonaws.com/";
const currentAudioName = "audioBanana.aac";

const text = "banana";

const useAudio = (url) => {
  console.log(url);
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    // TTS(text);
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const AudioPlayer = ({ url, className, source }) => {
  const [playing, toggle] = useAudio(url);
  if (source == null) source = protagonista;
  return (
    <div id={url} key={url} onClick={() => console.log({ url })}>
      <motion.img
        // style={{background:"none",
        //             border: "none",}}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.9 }}
        className={className}
        src={source}
        onClick={toggle}
      ></motion.img>
    </div>
  );
};

export default AudioPlayer;
