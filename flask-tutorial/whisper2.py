import whisper

model = whisper.load_model("medium")
result = model.transcribe("banana.aac")
print("ciao")
print(result["text"])