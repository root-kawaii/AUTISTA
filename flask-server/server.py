import datetime
from flask import Flask, request
import json


# Import flask and datetime module for showing date and time

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# http://127.0.0.1:5000/data
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