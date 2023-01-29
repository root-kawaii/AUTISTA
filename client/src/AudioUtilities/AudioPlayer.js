import React, { useState, useEffect } from "react";
import { Button, cardActionAreaClasses } from "@mui/material";
import textToSpeech from "./TextToSpeech";
import TTS from "./TextToSpeech";
import booko from "../Assets/UI/book_button.png";
import "../AudioUtilities/AudioPlayer.css";

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
  return (
    <div>
      <img className={className} src={source} onClick={toggle}></img>
    </div>
  );
};

export default AudioPlayer;
