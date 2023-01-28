import os
import time
from pygame import mixer


def ReproduceAudio(audio):
    audioFileName = "test.mp3"
    audio.save(audioFileName)
    mixer.init()
    mixer.music.load(audioFileName)
    mixer.music.play()
    while mixer.music.get_busy():
        time.sleep(0.5)
    mixer.quit()
    os.remove(audioFileName)