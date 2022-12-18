import { useEffect, useState } from "react";
import '../pages/Session'

export default function WebSocketCall({ socket,page }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = () => {
    page = page + 1
    socket.emit("data", page);
    setMessage("");
  };

  useEffect(() => {
    socket.on("data", (data) => {
      page = data

    });
  }, [socket, messages]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <button onClick={handleSubmit}>submit</button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>;
        })}
      </ul>
    </div>
  );
}