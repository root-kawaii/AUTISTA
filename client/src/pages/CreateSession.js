import {useEffect, useState} from "react";
import APIService from "../components/Server_Connection_API";
import {useNavigate} from "react-router-dom";


const CreateSession = (props) => {
    const [settings, setSettings] = useState('')
    const navigate = useNavigate();
    const length = 6;
    var sessionCode = [];
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const newSession = () => {
        APIService.OpenSession({sessionCode, settings})
            //.then((response) => props.insertedArticle(response))
            .catch(error => console.log('error', error))
    }


    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    const handleSubmit=(event)=>{
        event.preventDefault();
        sessionCode = generateString(length);
        newSession();
        navigate('/tutorMeeting/'+sessionCode)
    }

    return(
        <div className="CreateSession">
            <form onSubmit={handleSubmit}>
                <label htmlFor="body" className="form-label">Body</label>
                <textarea
                    className="Create_Session"
                    placeholder ="Enter settings"
                    rows='6'
                    value={settings}
                    onChange={(e)=>setSettings(e.target.value)}
                    required
                >
                </textarea>
                <button
                    className={"Create Session Button"}
                    >
                    Create Session
                </button>
            </form>
        </div>
    )
}

export default CreateSession;