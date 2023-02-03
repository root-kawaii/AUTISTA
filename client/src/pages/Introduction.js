import React, {useEffect, useState} from "react";
import "./Introduction.css";
import IntroductionLines from "../Assets/Introduction/IntroductionLines.json";
import protagonista from "../Assets/UI/protagonista.png";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";


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
                <div>
                    <motion.button
                            onClick={nextLine}
                            className="owlbutton"
                            animate={{ x: [0, 100, 300], y:[0, -50, 20], scale: [0.0, 0.5, 1.2], opacity:[0.3,0.8, 1]}}
                            transition={{repeat:0, duration: 4 , delay:1, times: [0, 0.4, 1], }} >

                              <AudioPlayer
                              className="gufoIntro"
                              source={protagonista}
                              url={owlLines[progress].audio}
                              // url={"https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/protagonista.mp3" }
                              ></AudioPlayer>

                    </motion.button>

                <Box className="owlChatBox">
                  <text className="intro-text">{owlLines[progress].line}</text>
                </Box>
                </div>
            </header>
        </div>
    );
}

export default Introduction;