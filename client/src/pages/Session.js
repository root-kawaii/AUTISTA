import React, {useEffect, useState} from "react";
import "./Session.css";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import AudioRecorder from "../AudioUtilities/AudioRecorder";
import Button from '@mui/material/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';




function Session(){

    const [data, setData] = useState({
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSelection, setIsSelection] = useState(true);
  const [err, setErr] = useState("");
  const [pick, setPick] = useState(0);

  console.log(isSelection);
  const navigate = useNavigate();

  const navigateCreation = () => {
    // 👇️ navigate to /
    navigate('/join');
  };

  const fetchImages = () => {
    setIsLoading(true);
    fetch("/data?" + new URLSearchParams({ page: data.page }))
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoading(false);
          setData({
            ...data,
            page: data.page + 1,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components. thanks docs!
        (error) => {
          setIsLoading(false);
          setErr(error);
        }
      );
  };

  // load initial state
  useEffect(fetchImages, []);

  return(
      <div className="Session">
          <header className="Session-header">
            {err ? (
              <h2>{err.message}</h2>
            ) : isLoading ? (
              <h2>loading... </h2>
            ) : isSelection ? (
              <>
                <p>name: {data.name}</p>
                <p>age: {data.age}</p>
                <div className="row">
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(0);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        data.keys[1]
                      }
                      alt="Immagine 1"
                    ></img>
                  </div>
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(1);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        data.keys[2]
                      }
                      alt="Immagine 2"
                    ></img>
                  </div>
                  <div className="column">
                    <img
                      onClick={() => {
                        setIsLoading(true);
                        setIsSelection(false);
                        setIsLoading(false);
                        setPick(2);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        data.keys[3]
                      }
                      alt="Immagine 3"
                    ></img>
                  </div>
                </div>
                <div className="row">
                    <Button variant="contained" onClick={navigateCreation}>Esci</Button>
                </div>
                {/* update every click... */}
                {/* <button onClick={fetchImages}>next page!</button> */}
                {/* <AudioPlayer
                  url={
                    "https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"
                  }
                />
                <AudioRecorder /> */}
              </>
            ) : (
              <>
              
                <p>name: {data.name}</p>
                <p>age: {data.age}</p>
                <div className="row">
                  <div className="column">
                    <img
                      onClick={() => {
                        fetchImages();
                        setIsSelection(true);
                      }}
                      src={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/" +
                        data.keys[pick + 1]
                      }
                      alt="Immagine 1"
                    ></img>
                  </div>
                  <div className="column">
                    <text>
                      <br></br>
                      Eight million Shinto deities travel secretly throughout the
                      earth.<br></br>
                      Those modest gods touch us-- touch us and move on.
                    </text>
                    </div>
                </div>
                <div className="row">
                    <AudioPlayer
                        url={"https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"}
                    />
                </div>
                <div className="row">
                    <AudioRecorder />
                </div>
                <div className="row">
                    <Button variant="contained" onClick={navigateCreation}>Esci</Button>
                </div>
                {/* update every click... */}
                {/* <button onClick={fetchImages}>next page!</button> */}
              </>
            )}

          </header>
      </div>
  )
}

export default Session;