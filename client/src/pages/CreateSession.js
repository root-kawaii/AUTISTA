import {useEffect, useState,useContext} from "react";
import APIService from "../components/Server_Connection_API";
import {useNavigate} from "react-router-dom";
import { Button } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import Session from "./Session";
import { io } from "socket.io-client";
import {socket, SocketContext} from '../components/socketto';



const CreateSession = (props) => {
    const [age, setParamOne] = useState('')
    const [names, setParamTwo] = useState('')
    const [settings, setParamThree] = useState('')
    const navigate = useNavigate();
    const length = 6;
    var sessionCode = [];
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const socket = useContext(SocketContext);

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

    function sendSessionInfo(){
            console.log('uoo')
            socket.emit("sess", {
                'age': age,
                'name': names,
                'setting': settings, })
            console.log(socket)
        
    }



    const handleSubmit=(event)=>{
        event.preventDefault();
        sendSessionInfo();
        sessionCode = generateString(length);
        newSession();
        navigate('/tutorMeeting/'+sessionCode)


    }

    return(
        <div className="CreateSession">
            <form onSubmit={handleSubmit}>
                <label htmlFor="body" className="form-label">Body</label>
                <section>
                <TextareaAutosize
                    className="Create_Session"
                    placeholder ="Enter Age"
                    rows='1'
                    value={age}
                    onChange={(e)=>setParamOne(e.target.value)}
                    required
                >
                </TextareaAutosize>
                </section>
                <section>
                <TextareaAutosize
                    className="Create_Session"
                    placeholder ="Enter Name and Surname"
                    rows='1'
                    value={names}
                    onChange={(e)=>setParamTwo(e.target.value)}
                    required
                >
                </TextareaAutosize>
                </section>
                <section>
                <TextareaAutosize
                    className="Create_Session"
                    placeholder ="Enter Therapy Number"
                    rows='1'
                    value={settings}
                    onChange={(e)=>setParamThree(e.target.value)}
                    required
                >
                </TextareaAutosize>
                </section>
                <Button variant='contained'
                    className={"Create Session Button"} onClick={handleSubmit}
                    >
                    Create Session
                </Button>
            </form>
        </div>
    )
}

export default CreateSession;