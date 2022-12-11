import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const currentBaseUrl = "https://aui20222.s3.eu-central-1.amazonaws.com/";
const currentAudioName = "audioBanana.aac";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
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