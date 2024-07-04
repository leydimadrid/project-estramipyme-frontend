
'use strict';

const startTest = document.querySelector(".start-test");
const start = document.querySelector(".btn-back");

const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const ovelay = document.querySelector(".overlay");
const navContainer = document.querySelector(".modal-nav");
const modalContent = document.querySelectorAll(".modal-content");
const navbtns = document.querySelectorAll(".form-link");
// startTest.addEventListener("click", function () {
//   modal.classList.remove("hidden");
//   ovelay.classList.remove("hidden");
// })

// const cerrarModal = function () {
//   modal.classList.add("hidden");
//   ovelay.classList.add("hidden");
// }

// closeBtn.addEventListener("click", cerrarModal);

// let currentBtn = 1;
// const numberOfSlides = modalContent.length;

// const btnLeft = document.querySelector(".btn-back");
// const btnRight = document.querySelector(".btn-next");

// const goToBtn = function (index) {
//   // activar el boton

//   const clicked = document.querySelector(`.form-link[data-content="${index}"]`);

//   navbtns.forEach(
//     btn => btn.classList.remove("form__link--active")
//   )
//   clicked.classList.add("form__link--active");
//   currentBtn = index;
//   // activar el contenido
//   modalContent.forEach(
//     cnt => cnt.classList.remove("modal__content--active")
//   );
//   console.log(clicked.dataset.content)
//   document.querySelector(`.modal__content--${clicked.dataset.content}`).classList.add("modal__content--active")
// }


//navigation
// navContainer.addEventListener("click", function (e) {
//   console.log("click", e.target.closest(".form-link"));
//   const clicked = e.target.closest(".form-link");
//   if (!clicked) return;
//   goToBtn(clicked.dataset.content);
//   currentBtn = clicked.dataset.content;
// })



// btnRight.addEventListener("click", function () {
//   if (currentBtn < numberOfSlides) {
//     currentBtn++;
//     goToBtn(currentBtn)
//   } else return;
// })

// btnLeft.addEventListener("click", function () {
//   if (currentBtn > 1) {
//     currentBtn--;
//     goToBtn(currentBtn)
//   } else return;

// })
const nav = document.querySelector(".nav");
const allSection = document.querySelectorAll(".section");
const navHeight = nav.getBoundingClientRect().height



const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry.isIntersecting)

  if (entry.isIntersecting) nav.classList.add("hidden");
  else nav.classList.remove("hidden")
}

const header = document.querySelector(".header");
const headerObserver = new IntersectionObserver(
  stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`
}
);
headerObserver.observe(header);


document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


startTest.addEventListener("click", function (e) {
  e.preventDefault();

  const id = e.target.getAttribute('href');
  console.log(id)
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

})

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  document.querySelectorAll(".nav__link").forEach(link =>link.classList.remove("selected-link"))

  

  const id = entry.target.id;
  document.querySelector(`.nav__link[href="#${id}"]`).classList.add("selected-link");




  // entry.target.classList.remove('section--hidden');
  // observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
