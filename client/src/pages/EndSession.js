import "./EndSession.css"
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import "../AudioUtilities/AudioPlayer.css";
import Box from "@mui/material/Box";
import React from "react";
import trophy from "../Assets/UI/Coppa.png"
import booko from "../Assets/UI/book_button.png";

function EndSession () {
    return(
        <div className="EndSession">
            <header className="EndSession-Header">

                <Box className="EndTextBox">
                  <text className="EndSession-text">Fantastico!!</text>
                    <img className="trophy" src={trophy}/>
                    <AudioPlayer
                      source={booko}
                      key={ /*TODO AUDIO VITTORIA*/
                        "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Complimenti.mp3"
                      }
                      url={
                        "https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/Complimenti.mp3"
                      }
                      className="victoryPageButton"
                    />
                </Box>
            </header>
        </div>
    );
}

export default EndSession;