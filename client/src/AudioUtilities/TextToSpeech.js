import React, { useEffect } from "react"


const TTS = text => {
  const msg = new SpeechSynthesisUtterance()
  msg.text = text
  window.speechSynthesis.speak(msg)
}

export default TTS;