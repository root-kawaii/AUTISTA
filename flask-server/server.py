import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import boto3
import sessionManager
from flask_socketio import SocketIO, emit

with open('auth.txt') as file:
    Lines = [line.rstrip() for line in file]

s3 = boto3.resource(
    service_name='s3',
    region_name='eu-central-1',
    aws_access_key_id=Lines[0],
    aws_secret_access_key=Lines[1]
)
# List of arrays to img_array
img_array = []
text_aray = []
audio_array = []
# Upload

s3.Bucket('aui20222').upload_file(
    Filename='audioBanana.aac', Key='audioBanana.aac')

'''
obj_list_key = []
for obj in s3.Bucket('aui20222').objects.all():
    print(type(obj.key))
    obj_list_key.append(obj.key)
'''

subjects = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Subjects/", Delimiter='/'):
    subjects.append(obj.key)
img_array.append(subjects)

places = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Places/", Delimiter='/'):
    places.append(obj.key)
img_array.append(places)

events = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Events/", Delimiter='/'):
    events.append(obj.key)
img_array.append(events)


story_char_audio = []
story_char_text = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Stories_Char/", Delimiter='/'):
    body = obj.get()['Body'].read()
    if(obj.key.endswith('txt')):
        story_char_text.append(str(body))
    else:
        story_char_audio.append(obj.key)
text_aray.append(story_char_text)
audio_array.append(story_char_audio)

story_place_audio = []
story_place_text = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Stories_Place/", Delimiter='/'):
    body = obj.get()['Body'].read()
    if(obj.key.endswith('txt')):
        story_place_text.append(str(body))
    else:
        story_place_audio.append(obj.key)
text_aray.append(story_place_text)
audio_array.append(story_place_audio)


story_adv_audio = []
story_adv_text = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Stories_Adv/", Delimiter='/'):
    body = obj.get()['Body'].read()
    if(obj.key.endswith('txt')):
        story_adv_text.append(str(body))
    else:
        story_adv_audio.append(obj.key)
text_aray.append(story_adv_text)
audio_array.append(story_adv_audio)


# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

page = 0


@ socketio.on("connect")
def connected():
    print('connected')
    print('broiasjasdfioas')
    emit("connect", {'keys': img_array[0], 'story_audio': audio_array[0],
         'story_texts': text_aray[0]}, broadcast=True)


@ socketio.on("data")
def handle_message(data):
    print(data)
    emit("connect", {'keys': img_array[
        (data + 1) % 3], 'story_audio': audio_array[(data + 1) % 3], 'story_texts': text_aray[(data + 1) % 3]}, broadcast=True)


@ socketio.on("sess")
def handle_message2(data):
    print(data["age"])


@ socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    # emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


'''
# Route for seeing a data
@app.route('/data', methods=['GET', 'POST'])
def get_time():
    # Returning an api for showing in reactjs
    page = int(request.args.get('page'))
    print("current page request: " + str(page))
    return {
        'name': "Mario Rossi",
        "age": "3",
        "keys": img_array[page % 3],
        # "subjects": subjects,
        "test_images": [page + 1, page + 2, page + 3],
        "page": page,
    }
'''


@ app.route('/audio', methods=['GET', 'POST'])
def get_audio():
    # Returning an api for showing in reactjs
    audio = request.get_json()
    # print("current page request: " + audio)
    return audio


@ app.route('/ses', methods=['GET', 'POST'])
def get_ses():
    # Returning an api for showing in reactjs
    body = request.get_json()
    # print("current page request: " + body)
    print(body["age"])
    return(body)


@ app.route('/add', methods=["POST"], strict_slashes=False)
@ cross_origin()
def request_received():
    return add_session()


@ app.route('/get', methods=["GET"], strict_slashes=False)
def send_settings():
    return sessionManager.get_player_session(request.args.get('code'))


def add_session():
    session_code = request.json['session_code']
    session_settings = request.json['session_settings']
    sessionManager.add_call(session_code, session_settings)


# Running app
if __name__ == '__main__':
    app.run(debug=True)
