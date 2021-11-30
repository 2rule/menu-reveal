import { TextLineReveal } from "./textLineReveal";
import { TextReveal } from "./textReveal";

let DOM = {
    frame: document.querySelector('.frame')
};

DOM.textContent = {
    heading: document.querySelector('.heading'),
}

const textReveal = new TextLineReveal(DOM.textContent.heading);

document.onload(textReveal.in());