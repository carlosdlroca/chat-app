import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import io from "socket.io-client";

let socket = io("http://localhost:3001");
socket.on("message", (message) => {
    console.log(`You received this message: ${message}`);
});
ReactDOM.render(<App />, document.querySelector("#root"));
