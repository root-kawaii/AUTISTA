import React from "react";
import MicRecorder from "mic-recorder-to-mp3";
import IconButton from "@mui/material/IconButton";
import mic from "../Assets/UI/mic_icon.png";
import meg from "../Assets/UI/meg_icon.png";
import "../AudioUtilities/AudioRecorder.css";
import { motion } from "framer-motion";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const serverURL = "/audio";

var currentAudio;

class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blob: null,
      blobURL: "",
      isBlocked: false,
      isSent: false,
      imageName: props.imageName,
    };
  }

  sendAudioToServer = () => {
    this.setState({ isSent: true });
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    fd.append("audio_data", this.state.blob);
    fd.append("image_name", this.state.imageName);
    xhr.open("POST", serverURL, true);
    xhr.send(fd);
  };

  startRecording = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      this.setState({ isSent: false });
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        currentAudio = new Audio(blobURL)

        this.setState({ blob: blob });
        this.setState({ blobURL, isRecording: false });
      })
      .then(this.sendAudioToServer)
      .catch((e) => console.log(e));

    console.log(this.state.blobURL);
  };

  changeState = () => {
    if (!this.state.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

//  QUESTO NON FUNZIONA
// playAudio() {
//   currentAudio.play();
// }

//  QUESTO SI
playSound = () => currentAudio.play()


  render() {
    return (
      // if you use something different from "className=App", the recording set is rendered differently
      <div>
        <IconButton
          className="mic_piccino"
          variant="contained"
          aria-label="Record"
          size="large"
          onClick={this.changeState}
          color={this.state.isRecording === true ? "error" : "success"}
        >
          <motion.img
            whileHover={{
              scale: 1.5,
              transition: { duration: 0.5 },
            }}
              whileTap={{ scale: 0.9 }}
            className="mic_piccino2"
            src={mic}
            disabled={this.state.isRecording}
          ></motion.img>
        </IconButton>

            {/*
                <Button variant='contained' onClick={this.changeState} disabled={this.state.isRecording}>Record</Button>
                <Button variant='contained' onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
            */}


        {/*OLD IMPLEMENTATION*/}

        {/*<audio*/}
        {/*  className={this.props.className}*/}
        {/*  src={this.state.blobURL}*/}
        {/*  controls="controls"*/}
        {/*/>*/}



        {/*                        I*/}
        {/*QUESTO è QUELLO GIUSTO  V*/}

        {/*TEST*/}
        {/*<button*/}
        {/*    style={{position:"absolute",*/}
        {/*    left: 20, top:20}}*/}
        {/*    */}
        {/*    */}

        {/*    onClick={this.playSound}>Play</button>*/}


        <IconButton
          className="meg_button"
          variant="contained"
          aria-label="Play"
          size="large"
          onClick={this.playSound}
        >
          <motion.img
            whileHover={{
              scale: 1.5,
              transition: { duration: 0.5 },
            }}
              whileTap={{ scale: 0.9 }}
            className="meg_img"
            src={meg}
          ></motion.img>
        </IconButton>

      </div>
    );
  }
}

export default AudioRecorder;
