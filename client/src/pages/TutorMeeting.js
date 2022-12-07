import {JitsiMeeting} from "@jitsi/react-sdk";
import {useParams} from "react-router-dom";
const TutorMeeting = () => {
    //TODO aggiungere funzioni per interagire con il gioco
    const {sessionCode} = useParams();
    return(
        <JitsiMeeting
    domain = { 'meet.jit.si' }
    roomName = {"COMUTTI2 _" + sessionCode}
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo = {{
        displayName: 'name'
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
/>
    )
}

export default TutorMeeting;
