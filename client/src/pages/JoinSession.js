import APIService from "../components/Server_Connection_API";
import {useState} from "react";
import './JoinSession.css'
import Button from '@mui/material/Button';

function JoinSession(){
    const [code, setCode] = useState('');
    const [settings, setSettings] = useState([]);

    function startGame(){
        APIService.GetPlayerSession(code);
    }

    const handleChange = event => {
        setCode(event.target.value);
    }
    return(
        <header className="join-session">
        <div className="JoinSession">
            <h1>
                Inserire codice sessione
            </h1>
            <input
                type={"text"}
                id={"code"}
                name={"code"}
                onChange={handleChange}
                value={code}
            />
        <div>
            <Button variant="contained"  onClick={startGame}>
                Start session
            </Button>
        </div>
        </div>
        </header>
    )
}

export default JoinSession;