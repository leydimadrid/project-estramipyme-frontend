
'use strict';

const startTest = document.querySelector(".start-test");
const start = document.querySelector(".btn-back");

const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const ovelay = document.querySelector(".overlay");
const navContainer = document.querySelector(".modal-nav");
const modalContent = document.querySelectorAll(".modal-content");
const navbtns = document.querySelectorAll(".form-link");
startTest.addEventListener("click", function () {
  modal.classList.remove("hidden");
  ovelay.classList.remove("hidden");
})

const cerrarModal = function () {
  modal.classList.add("hidden");
  ovelay.classList.add("hidden");
}

closeBtn.addEventListener("click", cerrarModal);


//navigation
navContainer.addEventListener("click", function (e) {
  console.log("click", e.target.closest(".form-link"));
  const clicked = e.target.closest(".form-link");
  if (!clicked) return;

  // console.log(navbtns)
  // activar el boton
  navbtns.forEach(
    btn => btn.classList.remove("form__link--active")
  )
  clicked.classList.add("form__link--active");

  // activar el contenido
  modalContent.forEach(
    cnt => cnt.classList.remove("modal__content--active")
  );
  console.log(clicked.dataset.content)
  document.querySelector(`.modal__content--${clicked.dataset.content}`).classList.add("modal__content--active")
})

