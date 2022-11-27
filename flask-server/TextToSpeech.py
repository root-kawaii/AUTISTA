import os
import time
from gtts import gTTS  # Google Text To Speech
from pygame import mixer

def TTS(text, play=True, language="it"):
    audioFileName = text+".mp3"
    audio = gTTS(text=text, lang=language, slow=True)
    audio.save(audioFileName)

    # SaveAudio(audio)

    if play:
        mixer.init()
        mixer.music.load(audioFileName)
        mixer.music.play()
        while mixer.music.get_busy():
            time.sleep(0.5)
        mixer.quit()
    os.remove(audioFileName)


def SaveAudio(audio):
    1+1
    #use to implement saving on AWS or whatever



TTS("Banana")
