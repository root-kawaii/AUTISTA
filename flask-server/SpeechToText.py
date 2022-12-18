import whisper
import os
import numpy as np


model = whisper.load_model("small")

audio = whisper.load_audio("audioBanana.aac")
audio = whisper.pad_or_trim(audio)
mel = whisper.log_mel_spectrogram(audio).to(model.device)


_, probs = model.detect_language(mel)
print(f"Detected language: {max(probs, key=probs.get)}")

options = whisper.DecodingOptions(
    language="it", without_timestamps=True, fp16=False)
result = whisper.decode(model, mel, options)
print(result.text)

#result = model.transcribe("audioBanana.aac")
# print(result["text"])
