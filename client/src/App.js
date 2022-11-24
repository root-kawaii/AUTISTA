// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import AudioPlayer from "./AudioPlayer";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState({
		name: "",
		age: 0,
		date: "",
		keys : [""],
		programming: "",
	});

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/data").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setdata({
					name: data.Name,
					age: data.Age,
					date: data.Data,
					programming: data.programming,
					keys: data.Keys
				});
			})
		);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>COMMUTTI II GANG</h1>
				<h3>We stand for legal weed</h3>
				{/* Calling a data from setdata for showing */}
				<p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
			<img src={"https://aui20222.s3.eu-central-1.amazonaws.com/"+ data.keys[0]} alt="br" heigt={300} width={300}></img>
			<AudioPlayer url={"https://aui20222.s3.eu-central-1.amazonaws.com/audioBanana.aac"}/>
			</header>	
		</div>
	);
}

export default App;
