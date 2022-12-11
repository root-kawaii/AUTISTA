import React, { useState, useEffect } from "react";
import textToSpeech from "./TextToSpeech";
import TTS from "./TextToSpeech";

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
      <button onClick={toggle}>{playing ? "Pause" : "Play" }</button>
    </div>
  );
};

export default AudioPlayer;