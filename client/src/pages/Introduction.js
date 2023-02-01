import React, {useEffect, useState} from "react";
import "./Introduction.css";
import IntroductionLines from "../Assets/Introduction/IntroductionLines.json";
import protagonista from "../Assets/UI/protagonista.png";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";



const owlLines = [];

IntroductionLines.map(function (item){
    owlLines.push({
        "line" : item.line,
        "audio" : item.audio,
    });
})


function Introduction() {

    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const nextLine = () => {
        setProgress(progress+1);
        if(progress >= owlLines.length -1 ){
            (navigate("/session/1")); //TODO set session code to the inserted one by the user
        }
    }


    return (
        <div className="Introduction">
            <header className="Introduction-header">
                <div onClick={nextLine}>
                    <AudioPlayer
                    className="mainCharacter"
                    source={protagonista}
                    url={owlLines[progress].audio}
                ></AudioPlayer>
                <Box className="textBox">
                  <text className="intro-text">{owlLines[progress].line}</text>
                </Box>
                </div>
            </header>
        </div>
    );
}

export default Introduction;