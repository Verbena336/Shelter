import "./pets.scss";
import { random } from "../../scrypt/random";
import pets from "../../scrypt/pets.json";

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav__list");
const body = document.querySelector(".page");
const overlay = document.querySelector(".overlay");
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const cards = document.querySelectorAll(".slider__item");
const sliderList = document.querySelector(".slider__list");
const modal = document.querySelector(".modal");
const controlButtons = document.querySelector(".control");
const controlPage = document.querySelector(".control__page");
const controlFirst = document.querySelector(".control__first");
const controlBack = document.querySelector(".control__back");
const controlNext = document.querySelector(".control__next");
const controlLast = document.querySelector(".control__last");
let pageCount = 1;
let numberOfPages = 6;
let num = 8;
let currentList;
let res =[]

function setNumberCards(num) {
  if (window.matchMedia("(max-width: 1279px)").matches) {
    num = 6;
    numberOfPages = 8
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    num = 3;
    numberOfPages = 16
  }
  for(let i=0; i< numberOfPages; i++) {
    res.push(random([],num))
  }
}
//   res = res.flat()
//   let result = {};
//   res.forEach(function(a){
//     if (result[a] != undefined)
//         ++result[a];
//     else
//         result[a] = 1;
// });
// for (let key in result) {
//   console.log(key,result[key])

// if(result[key] > 6) {
//   let index = res.findIndex(item=>item===+key)
//   console.log(index)
//   res[index] = Math.floor(Math.random() * 8)
//   if(result[key] > 7) {
//   let index2 = res.findLastIndex(item=>item===+key)
//   console.log(index, index2)
//   res[index2] = Math.floor(Math.random() * 8)
//   }
// }
// }
//   console.log(res)
// }

window.onload =
  (setNumberCards(num),
  renderList(res[0], sliderList, false));
  

hamburger.addEventListener("click", toggleMenu);
function toggleMenu(event) {
  if (event.target.classList.contains("hamburger--is-active")) {
    header.style.top = `${0}px`;
    header.classList.remove("header--abs");
  } else {
    header.classList.add("header--abs");
    header.style.top = `${window.pageYOffset}px`;
  }
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
  header.classList.remove("header--static");
  header.classList.remove("header--abs");
  header.style.top = `${0}px`;
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
    header.classList.remove("header--static");
    header.style.top = `${0}px`;
    header.classList.remove("header--abs");
    logo.classList.remove("logo--active");
  }
}

/////
cards.forEach((item) => {
  item.addEventListener("click", () => {
    overlay.classList.add("overlay--open");
    modal.classList.add("modal--open");
    body.classList.add("page--overflow-hidden");
  });
});

/////

controlFirst.addEventListener("click", pageNumber);
controlBack.addEventListener("click", pageNumber);
controlNext.addEventListener("click", pageNumber);
controlLast.addEventListener("click", pageNumber);
function pageNumber(event) {
  if (event.target.classList.contains("control__first")) {
    pageCount = 1;
    // renderPetsList(
    //   pagePetsList.slice(
    //     elementsCount * currentPage - elementsCount,
    //     elementsCount * currentPage
    //   ),
    //   cardsList,
    //   true
    // )
    // currentList = random([], num);
    renderList(res[pageCount - 1], sliderList, true);
    controlPage.innerText = pageCount;
  }
  if (event.target.classList.contains("control__back")) {
    pageCount -= 1;
    // renderPetsList(
    //   pagePetsList.slice(
    //     elementsCount * currentPage - elementsCount,
    //     elementsCount * currentPage
    //   ),
    //   cardsList,
    //   true
    // )
    // currentList = random([], num);
    renderList(res[pageCount - 1], sliderList, true);
    controlPage.innerText = pageCount;
  }
  if (event.target.classList.contains("control__next")) {
    pageCount += 1;
    // renderPetsList(
    //   pagePetsList.slice(
    //     elementsCount * currentPage - elementsCount,
    //     elementsCount * currentPage
    //   ),
    //   cardsList,
    //   true
    // )
    // currentList = random([], num);
    renderList(res[pageCount - 1], sliderList, true);
    controlPage.innerText = pageCount;
  }
  if (event.target.classList.contains("control__last")) {
    pageCount = numberOfPages;
    // renderPetsList(
    //   pagePetsList.slice(
    //     elementsCount * currentPage - elementsCount,
    //     elementsCount * currentPage
    //   ),
    //   cardsList,
    //   true
    // )
    // currentList = random([], num);
    renderList(res[pageCount - 1], sliderList, true);
    controlPage.innerText = pageCount;
  }
  disableFlag(pageCount);
}

function disableFlag(pageCount) {
  if (pageCount === 1) {
    controlFirst.disabled = true;
    controlBack.disabled = true;
  } else {
    controlFirst.disabled = false;
    controlBack.disabled = false;
  }
  if (pageCount === numberOfPages) {
    controlLast.disabled = true;
    controlNext.disabled = true;
  } else {
    controlLast.disabled = false;
    controlNext.disabled = false;
  }
}

function createCard({ name, img }) {
  return `<li class="slider__item slider__item--card" data-pet="${name}">
  <div class="slider__img">
     <img src="../${img}" alt="${name}" data-pet="${name}"/>
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
/////

sliderList.addEventListener("click", (e) => {
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
        <img src="../${img}">
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
