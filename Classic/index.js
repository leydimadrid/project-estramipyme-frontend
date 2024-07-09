
'use strict';

let answers = {}
let numberOfQuestions = 8;

function getProgress() {
  return Math.floor(Object.keys(answers).length / numberOfQuestions * 100);
}

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

  document.querySelectorAll(".nav__link").forEach(link => link.classList.remove("selected-link"))



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

//progress bar
//function updateBar () {
//let allQuestion = 51;
//let valorSumado = 0;
//for (let i = 1; i <= allQuestion; i++) {
//  let valor = 0;
//  let radios = document.querySelectorAll(`.question${i}`);
//  for (let j = 0; j < radios.length; j++) {
//    if (radios[j].checked) {
//      valor = parseInt(radios[j].value);
//      break;
//    }

//  }

//  valorSumado += valor;

//}

//let average = (valorSumado / allQuestion) *100;
const progress = document.getElementById('progreso');
//document.querySelector('.progreso').value = average;
//}
// function update() {
//   let progress = document.getElementById('progreso');
//   let scrollY = window.scrollY;
//   let scrollHeight = document.body.scrollHeight;
//   let innerHeight = window.innerHeight;

//   let percentage = (scrollY / (scrollHeight - innerHeight)) * 100;

//   progress.style.width = `${percentage}%`;

//   requestAnimationFrame(update);
// }

// update();

//Implement forms from json server


const createSection = function (data, id) {

  const formElement = document.createElement('form');
  formElement.classList.add(`form--${id}`)



  data.forEach((q) => {

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('questions')
    fieldset.classList.add(`question--${q.id}`)
    fieldset.setAttribute("data-question-id", q.id);
    const legend = document.createElement('legend');
    legend.textContent = q.question;



    fieldset.append(legend);
    formElement.append(fieldset)
    q.options.forEach((op, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.setAttribute("type", 'radio');
      input.setAttribute("name", `$Q${q.id}`);
      input.setAttribute("value", index);
      // label.append(input)
      label.innerHTML = `
      <input type="radio" name="Q${q.id}" value=${index + 1} class="radioinput radioinput__section--${id}" data-id="${q.id}-${index + 1}">${op}
      `;
      // label.insertAdjacentHTML('afterend', op);

      fieldset.append(label)

    })

  })
  return formElement;

}

function renderForm(data, id) {
  const form = createSection(data, id);
  const formContainer = document.querySelector(`#section--${id} .form-container`)
  formContainer.append(form)

  return form

}


function setLocalStorage(id, value) {
  answers[id] = value;
  localStorage.setItem('estramipyme', JSON.stringify(answers))
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('estramipyme'));
  if (!data) return;

  answers = data;

  for (const prop in answers) {
    if (answers.hasOwnProperty(prop)) {


      const input = document.querySelector(`.radioinput[data-id="${prop}-${answers[prop]}"]`)
      input.checked = true;
    }
  }


}
function reset() {
  localStorage.removeItem('estramipyme');
  progress.style.width ="0%"
}




const loadForms = function () {
  fetch('http://localhost:3000/questions').then(
    response => {
      if (!response.ok) throw new Error('there is no data');
      return response.json();
    }
  ).then(data => {
    console.log(data)
    const clientData = data.filter((e) => e.section === 'cliente');
    const businessData = data.filter((e) => e.section === 'negocio');
    // console.log(clientData)
    return [renderForm(clientData, 1),renderForm(businessData,2)]
    // return document.querySelectorAll(".questions")
  }
  ).then(forms => {
    //get local storage

    getLocalStorage()
    progress.style.width = `${getProgress()}%`;



    // Add event listener to the forms

    forms.forEach(form => {
      form.addEventListener('input', (e) => {
        // console.log(e.target.closest(".questions"))
        // console.log("respuesta")
        // console.log(e.target.value)
        const question = e.target.closest(".questions");
        setLocalStorage(question.dataset.questionId, e.target.value)

        progress.style.width = `${getProgress()}%`;
      })
    }
    )
  })
}
loadForms();





