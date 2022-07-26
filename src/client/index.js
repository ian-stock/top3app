import { createElement } from "lwc";
import App from "ui/app";

const elmnt = createElement("ui-app", { is: App });
document.querySelector('#lwc-main').appendChild(elmnt);

