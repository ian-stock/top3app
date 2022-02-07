import { createElement } from "lwc";
import App from "ui/app";
import { io } from "../../node_modules/socket.io-client/dist/socket.io.js"; // have to specify whole path for client side

const elmnt = createElement("ui-app", { is: App });
document.querySelector('#lwc-main').appendChild(elmnt);

const socket = io();
socket.on("connect", () => {
  console.log("socketid: " + socket.id); 
});
