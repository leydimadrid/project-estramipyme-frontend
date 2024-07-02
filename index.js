
'use strict';

const startTest = document.querySelector(".start-test");
const start = document.querySelector(".btn-back");

const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const ovelay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
startTest.addEventListener("click", function () {
  modal.classList.remove("hidden");
  ovelay.classList.remove("hidden");
})

const cerrarModal = function () {
  modal.classList.add("hidden");
  ovelay.classList.add("hidden");
}

closeBtn.addEventListener("click", cerrarModal);


