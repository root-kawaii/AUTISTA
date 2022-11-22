import boto3
import pandas as pd
from flask import Flask,request
import json

# Make dataframes
foo = pd.DataFrame({'x': [1, 2, 3], 'y': ['a', 'b', 'c']})
bar = pd.DataFrame({'x': [10, 20, 30], 'y': ['aa', 'bb', 'cc']})

# Save to csv
foo.to_csv('foo.csv')
bar.to_csv('bar.csv')

with open('auth.txt') as file:
    Lines = [line.rstrip() for line in file]

s3 = boto3.resource(
    service_name='s3',
    region_name='eu-central-1',
    aws_access_key_id=Lines[0],
    aws_secret_access_key=Lines[1]
)

# Upload files to S3 bucket
s3.Bucket('aui20222').upload_file(Filename='foo.csv', Key='foo.csv')
s3.Bucket('aui20222').upload_file(Filename='bar.csv', Key='bar.csv')

obj_list_key = []
for obj in s3.Bucket('aui20222').objects.all():
    print(type(obj.key))
    obj_list_key.append(obj.key)
    
    
# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def get_time():

	# Returning an api for showing in reactjs
	return {
		'Name':"geek",
		"Age":"22",
		"Keys": obj_list_key,
        "Data": x,
		"programming":"python"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
