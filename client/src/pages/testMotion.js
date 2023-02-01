import { motion } from "framer-motion";
import React from "react";
import protagonista from "../Assets/UI/protagonista.png";


// <motion.div animate={{ x: 100 }} />

function TestMotion() {
  return (
      <div className="vabene">
        <motion.img src={protagonista}
                    animate={{ x: [0, 0, 200], y:[0, 200, 0]}}
                    transition={{ duration: 2 , delay:1}}



        />
      </div>

  );
}

export default TestMotion;
