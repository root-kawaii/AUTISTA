import React, { useState, useEffect } from "react";
<<<<<<<< HEAD:client/src/components/AudioPlayer.js
import { Button } from "@mui/material";
========
import textToSpeech from "./TextToSpeech";
import TTS from "./TextToSpeech";
>>>>>>>> 89652419b27a15052dc1843fcbf733421e37a9ce:client/src/AudioUtilities/AudioPlayer.js

const currentBaseUrl = "https://aui20222.s3.eu-central-1.amazonaws.com/";
const currentAudioName = "audioBanana.aac";

const text = "banana"

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
      // TTS(text);
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);




  return [playing, toggle];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <Button variant='contained' onClick={toggle}>{playing ? "Pause" : "Play" }</Button>
    </div>
  );
};

export default AudioPlayer;