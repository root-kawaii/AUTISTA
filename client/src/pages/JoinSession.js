import APIService from "../components/Server_Connection_API";
import {useState} from "react";

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

            <button onClick={startGame}>
                Start session
            </button>
        </div>
    )
}

export default JoinSession;