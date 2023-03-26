import "./main.scss";
import { random } from "../../scrypt/random";
import pets from "../../scrypt/pets.json";

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav__list");
const body = document.querySelector(".page");
const overlay = document.querySelector(".overlay");
const logo = document.querySelector(".logo");
const modal = document.querySelector(".modal");
const buttonRight = document.querySelector(".control__next");
const buttonLeft = document.querySelector(".control__back");
const sliderBox = document.querySelector(".slider__box");
const sliderList = document.querySelector(".slider__list");
const sliderLeft = document.querySelector("#slider__list--left");
const sliderRight = document.querySelector("#slider__list--right");
const sliderCenter = document.querySelector("#slider__list--center");
let num = 3
let currentList = random([], num);
let freshList = random(currentList, num);

function setNumberCards(num) {
  if (window.matchMedia('(max-width: 1279px)').matches) {
    num = 2
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    num = 1
  }
  currentList = random([], num);
  freshList = random(currentList, num);
}

window.onload =
  (setNumberCards(num),
  renderList(currentList, sliderCenter, false),
  renderList(freshList, sliderLeft, false),
  renderList(freshList, sliderRight, false));


hamburger.addEventListener("click", toggleMenu);
function toggleMenu() {
  hamburger.classList.toggle("hamburger--is-active");
  nav.classList.toggle("nav__list--open");
  body.classList.toggle("page--overflow-hidden");
  overlay.classList.toggle("overlay--open");
  logo.classList.toggle("logo--active");
}
//ЗАТЕМНЕНИЕ
overlay.addEventListener("click", opacity);
function opacity() {
  nav.classList.remove("nav__list--open");
  hamburger.classList.remove("hamburger--is-active");
  body.classList.remove("page--overflow-hidden");
  overlay.classList.remove("overlay--open");
  logo.classList.remove("logo--active");
  modal.classList.remove("modal--open");
}
//ЗАКРЫТИЕ МЕНЮ
nav.addEventListener("click", closeNav);
function closeNav(event) {
  if (event.target.classList.contains("nav__link--active")) {
    nav.classList.remove("nav__list--open");
    hamburger.classList.remove("hamburger--is-active");
    body.classList.remove("page--overflow-hidden");
    overlay.classList.remove("overlay--open");
    logo.classList.remove("logo--active");
  }
  if (event.target.classList.contains("nav__link")) {
    nav.classList.remove("nav__list--open");
    hamburger.classList.remove("hamburger--is-active");
    body.classList.remove("page--overflow-hidden");
    overlay.classList.remove("overlay--open");
    logo.classList.remove("logo--active");
  }
}


/////Слайдер
const moveRight = () => {
  sliderBox.classList.add("animation__right");
  buttonLeft.removeEventListener("click", moveLeft);
  buttonRight.removeEventListener("click", moveRight);
  currentList = freshList;
  freshList = random(currentList, num);
};
const moveLeft = () => {
  sliderBox.classList.add("animation__left");
  buttonLeft.removeEventListener("click", moveLeft);
  buttonRight.removeEventListener("click", moveRight);
  currentList = freshList;
  freshList = random(currentList, num);
};
buttonRight.addEventListener("click", moveRight);
buttonLeft.addEventListener("click", moveLeft);

sliderBox.addEventListener("animationend", (animationEvent) => {
  sliderCenter.innerHTML = sliderLeft.innerHTML;
  renderList(freshList, sliderLeft, true);
  renderList(freshList, sliderRight, true);
  if (animationEvent.animationName === "move-left") {
    sliderBox.classList.remove("animation__left");
  } else {
    sliderBox.classList.remove("animation__right");
  }
  buttonRight.addEventListener("click", moveRight);
  buttonLeft.addEventListener("click", moveLeft);
});

/////
function createCard({ name, img }) {
  return `<li class="slider__item" data-pet="${name}">
  <div class="slider__img">
     <img src="${img}" alt="${name}" data-pet="${name}"/>
  </div>
  <h4 class="slider__name section__subtitle">${name}</h4>
  <button class="slider__learn-button button" data-pet="${name}">Learn more</button>
</li>`;
}

function renderList(array, box, flag) {
  if (flag) {
    box.innerHTML = "";
  }
  for (let item of array) {
    const petCard = document.createElement("li");
    box.appendChild(petCard);
    petCard.outerHTML = createCard(pets[item]);
  }
}
/////открытие модалки
sliderBox.addEventListener("click", (e) => {
  if (e.target.dataset.pet) {
    overlay.classList.add("overlay--open");
    modal.classList.add("modal--open");
    body.classList.add("page--overflow-hidden");
    

    let pet = pets.find(item=>item.name===e.target.dataset.pet)
    renderModal(pet, true)
  }
});


function createModal({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
  return `<button class="modal__close-button">
  </button>
  <div class="modal__content">
     <div class="pet__img">
        <img src="${img}">
     </div>
     <div class="modal__text pet">
        <h3 class="pet__name">${name}</h3>
        <h4 class="pet__breed">${type} - ${breed}</h4>
        <p class="pet__story">${description}</p>
        <ul class="pet__list">
           <li class="pet__item"><b>Age:</b> ${age}</li>
           <li class="pet__item"><b>Inoculations:</b> ${inoculations}</li>
           <li class="pet__item"><b>Diseases:</b> ${diseases}</li>
           <li class="pet__item"><b>Parasites:</b> ${parasites}</li>
        </ul>
     </div>
  </div>`;
}
function renderModal(pet, flag) {
  if (flag) {
    modal.innerHTML = "";
  }
  modal.innerHTML = createModal(pet)
  const closeModal = document.querySelector('.modal__close-button')
    overlay.addEventListener('mouseenter', () => {
      closeModal.classList.add('modal__close-button--hover')
    })
    overlay.addEventListener('mouseleave', () => {
      closeModal.classList.remove('modal__close-button--hover')
    })
  closeModal.addEventListener("click", () => {
    overlay.classList.remove("overlay--open");
    modal.classList.remove("modal--open");
    body.classList.remove("page--overflow-hidden");
  });
}
