import { createElement } from "lwc";
import App from "ui/app";
// import { io } from "socket.io-client"; - doesn't work with rollup, leave in html

const elmnt = createElement("ui-app", { is: App });
document.querySelector('#lwc-main').appendChild(elmnt);

const socket = io();
socket.on("connect", () => {
  console.log("socketid: " + socket.id); 
});
