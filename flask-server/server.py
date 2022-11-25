import datetime
from flask import Flask, request
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

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data


@app.route('/data')
def get_time():
    # Returning an api for showing in reactjs
    page = int(request.args.get('page'))
    print("current page request: " + str(page))
    return {
        'name': "geek",
        "age": "22",
        # "keys": obj_list_key,
        "test_images": [page + 1, page + 2, page + 3],
        "data": x,
        "page": page,
    }


# Running app
if __name__ == '__main__':
    app.run(debug=True)