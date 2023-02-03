import { motion } from "framer-motion";
import React from "react";
import protagonista from "../Assets/UI/protagonista.png";


// <motion.div animate={{ x: 100 }} />

function TestMotion() {

  return (
      <div className="vabene">


          <motion.button
                  style={{
                      width: 400,
                      height: 400,
                      // backgroundColor: "#fff",
                      background:"none",
                      border: "none"
                   }}

                animate={{ x: [0, 100, 300], y:[0, -50, 20], scale: [0.9, 0.5, 1.2]}}
                transition={{repeat:0, duration: 4 , delay:1, times: [0, 0.4, 1], }}
          >

                <motion.img src={protagonista}
                    whileHover={{
                        scale: 1.4,
                        transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                />
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
