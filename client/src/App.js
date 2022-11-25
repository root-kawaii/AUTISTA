// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";

function App() {
  const [data, setData] = useState({
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");

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

  return (
    <div className="App">
      <header className="App-header">
        {err ? (
          <h2>{err.message}</h2>
        ) : isLoading ? (
          <h2>loading... </h2>
        ) : (
          <>
            <p>name: {data.name}</p>
            <p>age: {data.age}</p>
            {/* <img
              src={
                "https://aui20222.s3.eu-central-1.amazonaws.com/" + data.keys[0]
              }
              alt="br"
              heigt={300}
              width={300}
            ></img> */}
            {data.test_images.map((img, i) => (
              <div key={`img_${i}`}>{img}</div>
            ))}
            {/* update every click... */}
            <button onClick={fetchImages}>next page!</button>
            {/* <AudioPlayer
              url={
                "https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"
              }
            />
            <AudioRecorder /> */}
          </>
        )}
      </header>
    </div>
  );
}

export default App;