import datetime
from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import boto3
import sessionManager

with open('auth.txt') as file:
    Lines = [line.rstrip() for line in file]

s3 = boto3.resource(
    service_name='s3',
    region_name='eu-central-1',
    aws_access_key_id=Lines[0],
    aws_secret_access_key=Lines[1]
)
# List of arrays to list_array
list_array = []
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
list_array.append(subjects)

places = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Places/", Delimiter='/'):
    places.append(obj.key)
list_array.append(places)

events = []
for obj in s3.Bucket('aui20222').objects.filter(Prefix="Events/", Delimiter='/'):
    events.append(obj.key)
list_array.append(events)

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def get_time():
    # Returning an api for showing in reactjs
    page = int(request.args.get('page'))
    print("current page request: " + str(page))
    return {
        'name': "Mario Rossi",
        "age": "3",
        "keys": list_array[page % 3],
        # "subjects": subjects,
        "test_images": [page + 1, page + 2, page + 3],
        "page": page,
    }


@app.route('/audio', methods=['GET', 'POST'])
def get_audio():
    # Returning an api for showing in reactjs
    audio = request.get_json()
    #print("current page request: " + audio)
    return audio


@ app.route('/ses', methods=['GET', 'POST'])
def get_ses():
    # Returning an api for showing in reactjs
    body = request.get_json()
    #print("current page request: " + body)
    print(body["age"])
    return(body)


@app.route('/add', methods=["POST"], strict_slashes=False)
@cross_origin()
def request_received():
    return add_session()


@app.route('/get', methods=["GET"], strict_slashes=False)
def send_settings():
    return sessionManager.get_player_session(request.args.get('code'))


def add_session():
    session_code = request.json['session_code']
    session_settings = request.json['session_settings']
    sessionManager.add_call(session_code, session_settings)


# Running app
if __name__ == '__main__':
    app.run(debug=True)
