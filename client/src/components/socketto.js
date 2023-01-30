import socketio from "socket.io-client";
import { io } from "socket.io-client";
import React from "react";

var connection = io("http://127.0.0.1:5000", {
  transports: ["websocket"],
  cors: {
    header: "Access-Control-Allow-Origin: *",
    origin: "http://localhost:3000/",
  },
});

export const socket = socketio.connect("http://127.0.0.1:5000", {
  cors: {
    header: "Access-Control-Allow-Origin: *",
    origin: "http://localhost:3000/",
  },
});
export const SocketContext = React.createContext();
