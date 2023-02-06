import React, {useState} from "react";
import "./Introduction.css";
import IntroductionLines from "../Assets/Introduction/IntroductionLines.json";
import protagonista from "../Assets/UI/protagonista.png";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";


const owlLines = [];

IntroductionLines.map(function (item){
    owlLines.push({
        "line" : item.line,
        "audio" : item.audio,
    });
})


function Introduction() {

    const [progress, setProgress] = useState(0);
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();


    const firstAudio = new Audio(owlLines[0].audio);
    const animationDuration = 6;
    const animationDelay = 0.5;

    const nextLine = () => {
        setProgress(progress+1);
        if(progress >= owlLines.length -1 ){
            (navigate("/session/1")); //TODO set session code to the inserted one by the user
        }
    }

    const startPage = () =>{
        setStarted(true);
    }

    const playSound = () => {
        setTimeout(() => {  firstAudio.play(); console.log("first audio played")}, (animationDuration + animationDelay)*1000);
        // firstAudio.play()

    }
    return (
        <div className="Introduction">
            <header className="Introduction-header">
                {started ? (
                    <div>
                    <motion.button
                            onLoad={playSound}
                            onClick={nextLine}
                            className="owlbutton"
                            animate={{ x: [600, -300, 150], y:[500, 250, 20], scale: [0.0, 0.6, 1.2], opacity:[0.1, 0.7, 1]}}
                            transition={{repeat:0, duration: animationDuration , delay:animationDelay, times: [0, 0.6, 1], }}

                    // animate={{ x: [150], y:[20], scale: [1.2], opacity:[1]}}
                    >
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
                ):(
                    <motion.div
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.5 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                            <button className="bigButton"
                                onClick={startPage}


                            > INIZIAMO!

                            </button>
                    </motion.div>
                )}
            </header>
        </div>
    );
}

export default Introduction;