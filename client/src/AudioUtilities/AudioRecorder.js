import React, { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import mic from "../Assets/UI/mic_icon.png";
import AudioPlayer from "./AudioPlayer";
import "../AudioUtilities/AudioRecorder.css";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const serverURL = "/audio";

const AudioRecorder = ({ imageName }) => {
  const [state, setState] = useState({
    isRecording: false,
    blob: null,
    blobURL: "",
    isBlocked: false,
    isSent: false,
    imageName: imageName,
  });

  const sendAudioToServer = () => {
    setState((state) => ({ ...state, isSent: true }));
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    fd.append("audio_data", state.blob);
    fd.append("image_name", state.imageName);
    xhr.open("POST", serverURL, true);
    xhr.send(fd);
  };

  const startRecording = () => {
    if (state.isBlocked) {
      console.log("Permission Denied");
    } else {
      setState((state) => ({ ...state, isSent: false }));
      Mp3Recorder.start()
        .then(() => {
          setState((state) => ({ ...state, isRecording: true }));
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setState((state) => ({ ...state, blob: blob }));
        setState((state) => ({ ...state, blobURL, isRecording: false }));
      })
      .then(sendAudioToServer)
      .catch((e) => console.log(e));

    console.log(state.blobURL);
  };

  const changeState = () => {
    if (!state.isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(
    () =>
      navigator.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setState((state) => ({ ...state, isBlocked: false }));
        },
        () => {
          console.log("Permission Denied");
          setState((state) => ({ ...state, isBlocked: true }));
        }
      ),
    []
  );
  return (
    // if you use something different from "className=App", the recording set is rendered differently
    <div className="App">
      <div>
        <IconButton
          variant="contained"
          aria-label="Record"
          size="large"
          color={state.isRecording === true ? "error" : "success"}
          onClick={changeState}
        >
          <img
            className="mic_piccino"
            src={mic}
            disabled={state.isRecording}
          ></img>
        </IconButton>
      </div>
      {/*
        <Button variant='contained' onClick={changeState} disabled={state.isRecording}>Record</Button>
        <Button variant='contained' onClick={stop} disabled={!state.isRecording}>Stop</Button>
          */}
      <audio url={state.blobURL} controls="controls" />
      {/*just to check if the sendAudioToServer function is called*/}
    </div>
  );
};

export default AudioRecorder;
