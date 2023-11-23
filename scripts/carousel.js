import { worlds } from './worlds.js';

const carousel = document.getElementById("carousel-block");
const canvas = document.getElementById("location-photo");
const context = canvas.getContext("2d");

canvas.width = carousel.clientWidth;
canvas.height = carousel.clientHeight;
let x = 20;
let y = 150;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const loadImage = (imageUrl) => {
    const img = new Image();
    img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageUrl;
}

let currentSlideNum = 0;
const minSlideNum = 0;
const maxSlideNum = worlds.length - 1;

const moveSlides = (event) => {
  let button = event.currentTarget;
  let isLeft = button.classList[1] === "left";

  currentSlideNum = currentSlideNum + (isLeft ? -1 : 1);
  changeSlides();
}

function blockButton() {
  if (currentSlideNum === minSlideNum) {
    buttons[0].classList.add("blocked");
  }
  if (currentSlideNum === maxSlideNum) {
    let len = buttons.length;
    buttons[len - 1].classList.add("blocked");
  }
}

function unblockButtons() {
  buttons.forEach((b) => b.classList.remove("blocked"));
}

async function changeSlides() {
  unblockButtons();
  loadImage(worlds[currentSlideNum].image_link);
  blockButton();
}


const buttons = document.querySelectorAll(".carousel-button");
buttons.forEach(button => button.addEventListener('click', moveSlides));