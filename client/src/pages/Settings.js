import React, {useState} from 'react';
import Select from 'react-select'
import {Button} from "@mui/material";

// const serverURL = "/settings"

const possibleTags = [
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'sci-fi', label: 'Sci-fi' }
]
const sendSettingsToServer = () => {

  // fetch(serverURL, {
  //    method: 'POST',
  //    //mode: 'cors',        //this depends on the port used by the React app and server
  //    body: JSON.stringify( /*data*/ )
  //  })

}


const Settings = () => {
  const [storyTag, setStoryTag] = useState('');
  const [soundToTrain, setSoundToTrain] = useState('');

  const handleChangeTag= (e) => {
    console.log("set tag!!");
    setStoryTag(e.value)
  }

  const handleChangeSound= (e) => {
    console.log("set sound!!")
    setSoundToTrain(e.target.value)
  }

  const checkSettings = () => {
    console.log(storyTag)
    console.log(soundToTrain)
  }

  return (
      // ???
    <div className="App">
      {/*???*/}
      <header className="App-header">

        <h1>Settings </h1>
        <h2>Story tag</h2>
        <Select options={possibleTags} onChange={handleChangeTag}/>
        <h2>Sound to train</h2>
        <input type={"text"} onChange={handleChangeSound}/>

        <div>
          <button onClick={checkSettings}> Current settings </button>
        </div>


      </header>
    </div>
  );
}

export default Settings;