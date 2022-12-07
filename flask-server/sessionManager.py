
class Session:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self, code, params):
        self.code = code
        self.params = params


# here are saved all the actually opened sessions
OpenCalls = []


# creates a new Session object with call_id and settings json.
# If a call is already existent returns -1 and a new unique id is needed
def add_call(call_id, settings):
    print("new session received")
    for x in OpenCalls:
        if x.call_id == call_id:
            return -1
    OpenCalls.append(Session(call_id, settings))
    return


# returns the player webpage using the tutor's settings
#TODO return the correct page.
#the old function used to return just the settings saved in the Session class but it is better to
#initialize the whole page on the server and then send it
def get_player_session(call_id):
    for x in OpenCalls:
        if x.call_id == call_id:
            return x.settings
    return


# removes the call_id session from the OpenCalls array
def close_call(call_id):
    for x in OpenCalls:
        if x.call_id == call_id:
            OpenCalls.remove(x)
            return
    return -1
