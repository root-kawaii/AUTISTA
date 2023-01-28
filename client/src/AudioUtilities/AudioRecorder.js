import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const serverURL = "/audio"

class AudioRecorder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        isRecording: false,
        blob: null,
        blobURL: '',
        isBlocked: false,
        isSent: false,
        imageName : props.imageName
    };
  }

  sendAudioToServer = () => {
      this.setState({ isSent: true })
      var xhr=new XMLHttpRequest();
      var fd=new FormData();
      fd.append("audio_data",this.state.blob);
      fd.append("image_name",this.state.imageName);
      xhr.open("POST",serverURL,true);
      xhr.send(fd);
  }

  startRecording = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
        this.setState({ isSent: false })
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stopRecording = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
          this.setState({ blob: blob });
        this.setState({ blobURL, isRecording: false });
      }).then(this.sendAudioToServer).catch((e) => console.log(e));

      console.log(this.state.blobURL)
  };

  changeState = () =>{
      if(!this.state.isRecording){
          this.startRecording()
      }else{
          this.stopRecording()
      }
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    return (
        // if you use something different from "className=App", the recording set is rendered differently
      <div className="App">
        <header className="App-header">
          <IconButton
              variant="contained"
              aria-label = "Record"
              size="large"
              color={this.state.isRecording === true ? "error" : "success"}>
                <MicIcon onClick={this.changeState} disabled={this.state.isRecording}>Record</MicIcon>
            </IconButton>
            {/*
                <Button variant='contained' onClick={this.changeState} disabled={this.state.isRecording}>Record</Button>
                <Button variant='contained' onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
            */}
          <audio src={this.state.blobURL} controls="controls" />
          {/*just to check if the sendAudioToServer function is called*/}
          <Button variant='contained' disabled={this.state.isSent}>SENT</Button>
        </header>
      </div>
    );
  }
}

export default AudioRecorder;