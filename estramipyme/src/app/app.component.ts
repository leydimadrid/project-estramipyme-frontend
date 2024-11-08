import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';

import { Question } from '@models/question.model';
import { RenderFormDirective } from './directives/render-form.directive';
import { FooterComponent } from './pages/components/footer/footer.component';
import { GlobalProviderService } from '@services/global-provider.service';
import { GraphCircleComponent } from './components/graph-circle/graph-circle.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { Form } from '@models/form.model';
import { FormService } from '@services/form.service';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { TestService } from '@services/test.service';
import { TestRequestDTO } from './DTO/testRequestDTO';

import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';


type Answers =
  | {}
  | {
      [key: string | number]: string;
    };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GraphsComponent,
    FooterComponent,
    GraphCircleComponent,
    LoginComponent,
    RegisterComponent,
    PdfGeneratorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoged = signal<boolean>(false);
  mobileOpen = signal<boolean>(false);
  progress = signal(0);
  title: String = 'estramipyme';
  private answers: any = {};
  private el: ElementRef;
  private numberOfQuestions = 50;
  #nav: HTMLHtmlElement | any;
  #navHeight: HTMLHtmlElement | any;
  #header: HTMLHtmlElement | any;
  #allSections: HTMLHtmlElement | any;
  #progress: HTMLHtmlElement | any;
  #navLinks: HTMLHtmlElement | any;

  // private provider = inject(GlobalProviderService)
  globalProvider!: GlobalProviderService;

  //Listado form
  formsData : Form[] = [];
  //Servicio form
  private formService! : FormService;
  private testService! : TestService;
  isLoading = false;
  private testData! : TestRequestDTO;

  constructor(el: ElementRef, 
    globalProvider: GlobalProviderService,
    formService : FormService,
    testService : TestService) {
    this.el = el;
    this.globalProvider = globalProvider;
    this.formService = formService;
    this.testService = testService;
  }

  gotoReport() {
    const reportSection = document.getElementById("report");
    if(reportSection) {
      reportSection.scrollIntoView({behavior: 'smooth', block:'start'})
    }
  }

  toggleLogin() {
    this.isLoged.update((prevValue) => !prevValue);
  }

  toggleMobileOpen() {
    this.mobileOpen.update((prevValue) => !prevValue);
  }

  loadForms(){
    this.isLoading = true;
    try{
      this.formService.getForms().subscribe({
        next: (_forms) =>{
          this.formsData = _forms;
          console.log(_forms);
          this.isLoading = false;
        },
        error: (err) =>{
          console.error(err.message);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 2500
          });
          this.isLoading = false;
        }
      });
    }catch(error){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error realizando la consulta API",
        showConfirmButton: false,
        timer: 2500
      });
      console.error(error);
      this.isLoading = false;
    }   
  }


  onOptionSelect(formId: number,questionId: number, optionId: number) {
    try{
      // Encuentra la pregunta correspondiente
      const question = this.formsData.find(f => f.id == formId)?.questions.find(q => q.id === questionId);
      if (question) {
        // Recorre las opciones y ajusta la propiedad `selected`
        question.questionOptions.forEach(option => {
          option.selected = option.id === optionId;
        });
      }
      console.log(this.formsData);
    }catch(error){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al seleccionar la respuesta",
        showConfirmButton: false,
        timer: 2500
      });
      console.error(error);
    }    
  }

  ngOnInit() {
    this.globalProvider.IsLogged$.subscribe((value) => {
      this.isLoged.set(value);
      if(this.isLoged()){
        //cargar forms
        this.loadForms();
      }
    });

    this.globalProvider.Progress$.subscribe((value) => {
      this.progress.set(value);
    });

   
    

    this.#navLinks = this.el.nativeElement.querySelector('.nav__links');
    this.#nav = this.el.nativeElement.querySelector('.nav');
    this.#navHeight = this.#nav.getBoundingClientRect().height;
    const startTest = this.el.nativeElement.querySelector('.start-test');
    this.#header = this.el.nativeElement.querySelector('.header');
    this.#allSections =
      this.el.nativeElement.querySelectorAll('.section__main');
    this.#progress = document.getElementById('progreso');

    startTest.addEventListener('click', this._handlerStartTest.bind(this));
    //cargar formularios desde json server

    // Hacer el fade in de la barra de navegacón
    this.#nav.addEventListener('mouseover', this._handleHover.bind(0.5));
    this.#nav.addEventListener('mouseout', this._handleHover.bind(1));
    const sectionObserver = new IntersectionObserver(
      this._revealSection.bind(this),
      {
        root: null,
        threshold: 0.15,
      }
    );
    this.#navLinks.addEventListener('click', function (e: any) {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
    this.#allSections.forEach(function (section: HTMLHtmlElement) {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
    const headerObserver = new IntersectionObserver(
      this._createStickyNav.bind(this),
      {
        root: null,
        threshold: 0,
        rootMargin: `${this.#navHeight}px`,
      }
    );
    headerObserver.observe(this.#header);

    this._setupResultsButton();
    // this._setupBorrarButton();
    this._setupResultsButton();
    // this._setupBorrarButton();
  }

  resetForm(): void {
    this.globalProvider.reset();
  }

  _revealSection(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    this.el.nativeElement
      .querySelectorAll('.nav__link')
      .forEach((link: HTMLElement) => link.classList.remove('selected-link'));
    const id: String = entry.target.id;
    const element: HTMLHtmlElement = this.el.nativeElement.querySelector(
      `.nav__link[href="#${id}"]`
    );

    this.el.nativeElement
      .querySelector(`.nav__link[href="#${id}"]`)
      .classList.add('selected-link');
  }

  _handleHover(e: any) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach((el: any) => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  }

  _handlerStartTest(e: MouseEvent) {
    const target = e.target as unknown as HTMLElement;
    e.preventDefault();

    const id: String | null = target.getAttribute('href');
    this.el.nativeElement
      .querySelector(id)
      .scrollIntoView({ behavior: 'smooth' });
  }

  _getProgress() {
    if (!this.answers) return 0;
    if (!this.numberOfQuestions) return 0;
    return Math.ceil(
      (Object.keys(this.answers).length / this.numberOfQuestions) * 100
    );
  }

  _createStickyNav(entries: any) {
    const [entry] = entries;
    if (entry.isIntersecting) this.#nav.classList.add('hidden');
    else this.#nav.classList.remove('hidden');
  }

  completeQuestionsValidate(){

    let validation = true;

    const fieldsets = this.el.nativeElement.querySelectorAll(
      '.form--1 fieldset'
    );

    // Resetear cualquier error previo
    fieldsets.forEach((fieldset: HTMLHtmlElement) => {
      fieldset.classList.remove('fieldset-error');
    });

    this.formsData.map((form) =>{
      form.questions.map((question) =>{
        let opcionSeleccionada = question.questionOptions.filter(x => x.selected !== null && x.selected === true);
        console.log(opcionSeleccionada);
        if(opcionSeleccionada.length == 0){
          console.log("En la pregunta " + question.statement + " no se selecciono nada");
          const fieldsets = this.el.nativeElement.querySelectorAll(
            '.Q'+question.id
          );
          console.log(fieldsets);
          // Resetear cualquier error previo
          fieldsets.forEach((fieldset: HTMLHtmlElement) => {
            fieldset.classList.add('fieldset-error');
          });
          validation = false;
        }

      });
    });
    return validation;
  }

  onSaveResults(){
    if(this.completeQuestionsValidate()){
      this.saveTest();
    }
  }


  saveTest(){
    this.isLoading = true;
    try{


      let ids : number[] = [];

      this.formsData.map(f=>{
        f.questions.map(q=>{
          q.questionOptions.map(qo=>{
            if(qo.selected){
              ids.push(qo.id);
            }
          });
        });
      });

      this.testData = {
        id: 0,
        user_id: 2, //TODO: AJUSTAR CON LOGIN
        date: new Date(),
        answers_option_ids: ids
      }

      console.log(this.testData);

      this.testService.saveTest(this.testData).subscribe({
        next: (_test) =>{
          console.log(_test);
          this.isLoading = false;
        },
        error: (err) =>{
          console.error(err.message);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 2500
          });
          this.isLoading = false;
        }
      });
    }catch(error){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error realizando la consulta API",
        showConfirmButton: false,
        timer: 2500
      });
      console.error(error);
      this.isLoading = false;
    }   
  }

  _setupResultsButton() {
    const showResultsButton = this.el.nativeElement.querySelector(
      '.section-see-results .btn--show-modal'
    );

    if (!showResultsButton) {
      console.error('Botón "Ver resultados" no encontrado.');
      return;
    }

    
/*
    showResultsButton.addEventListener('click', () => {

      this.completeQuestionsValidate();

    
      const fieldsets = this.el.nativeElement.querySelectorAll(

        '.form--1 fieldset'

       '.form-container fieldset'

      );

      // Resetear cualquier error previo
      fieldsets.forEach((fieldset: HTMLHtmlElement) => {
        fieldset.classList.remove('fieldset-error');
      });

      console.log(this.globalProvider.answers());
      console.log(this.globalProvider.numberOfQuestions);

      if (
        Object.entries(this.globalProvider.answers()).length <
        this.globalProvider.numberOfQuestions
      ) {
        const answerIds = Object.keys(this.globalProvider.answers());

        fieldsets.forEach((fieldset: HTMLHtmlElement) => {
          const current = fieldset.getAttribute('data-question-id');
          if (current) {
            if (!answerIds.includes(current))
              fieldset.classList.add('fieldset-error');
          }
        });

        const questionsKeys = Array.from(
          { length: this.globalProvider.numberOfQuestions },
          (_, i) => String(i + 1)
        );

        const queue = questionsKeys.filter(
          (element) => !answerIds.includes(element)
        );

        const currentTarget: HTMLHtmlElement =
          this.el.nativeElement.querySelector(
            `.form-container fieldset[data-question-id="${queue[0]}"]`
          );
        currentTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else {
        console.log('Todas las preguntas han sido respondidas.');
        const radarSection =
          this.el.nativeElement.querySelector('.section-radar');
        if (radarSection) {
          radarSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    });
    */
  }
}
