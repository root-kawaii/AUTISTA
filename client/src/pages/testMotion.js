import { motion } from "framer-motion";
import React, {useState} from "react";
import protagonista from "../Assets/UI/protagonista.png";
import AudioPlayer from "../AudioUtilities/AudioPlayer";
import "./testMotion.css";



function TestMotion() {

    const [animated, setAnimated] = useState(true)

  return (
      <div className="vabene">

          <motion.button
              className="owlbuttontest"
                animate={{ x: [0, 100, 300], y:[0, -50, 20], scale: [0.0, 0.5, 1.2], opacity:[0.3,0.8, 1]}}
                transition={{repeat:0, duration: 4 , delay:1, times: [0, 0.6, 1], }}
          >

                {/*<motion.img src={protagonista}*/}
                {/*    whileHover={{*/}
                {/*        scale: 1.4,*/}
                {/*        transition: { duration: 0.5 }*/}
                {/*    }}*/}
                {/*    whileTap={{ scale: 0.9 }}*/}
                {/*/>*/}
              <AudioPlayer
              className="gufotest"
              source={protagonista}
              url={"https://aui20222.s3.eu-central-1.amazonaws.com/Stories_Char/protagonista.mp3" }
              ></AudioPlayer>

        </motion.button>
      </div>

  );


        //drag and move
                    // drag
                    // dragConstraints={{
                    //   top: -50,
                    //   left: -50,
                    //   right: 50,
                    //   bottom: 50,
                    // }}


        //appear
                    // initial={{ opacity: 0 }}
                    // whileInView={{ opacity: 1 }}
                    // viewport={{ once: true }}
                    // transition={{ duration: 2 , delay:1}}
}



export default TestMotion;
