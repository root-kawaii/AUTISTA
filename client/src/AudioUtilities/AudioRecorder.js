import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button } from '@mui/material';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const serverURL = "/audio"

class AudioRecorder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      isSent: false
    };
  }

  // TO IMPLEMENT:
  //     FUNCTION TO SEND RECORDED AUDIO TO SERVER
  sendAudioToServer = () => {
    this.setState(this.setState({ isSent: true }))

    fetch(serverURL, {
    
       method: 'POST',
       mode: 'cors',        //this depends on the port used by the React app and server
       body: JSON.stringify(this.blobURL)
    
     })

  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).then(this.sendAudioToServer).catch((e) => console.log(e));
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
          <Button variant='contained' onClick={this.start} disabled={this.state.isRecording}>Record</Button>
          <Button variant='contained' onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
          <audio src={this.state.blobURL} controls="controls" />
          {/*just to check if the sendAudioToServer function is called*/}
          <Button variant='contained' disabled={this.state.isSent}>SENT</Button>
        </header>
      </div>
    );
  }
}

export default AudioRecorder;