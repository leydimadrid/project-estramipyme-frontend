import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataProcService } from '@services/data-proc.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterDataModel } from '@models/registerdata.models';
import { AuthService } from '@services/auth.service';
import { TypeDocument } from '../../enums/typedocument.enum';
import { Sector } from '../../enums/Sector.enum';
import { TypeUser } from '../../enums/typeuser.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  sector = Sector;
  typeDocument = TypeDocument;
  typeUsers = TypeUser;
  // passwordDoNotMatch = signal<boolean>(false);
  // invalidSurname = signal<boolean>(false);
  // invalidBusinessName = signal<boolean>(false);
  // invalidId = signal<boolean>(false);
  // invalidName = signal<boolean>(false);
  router!: Router;
  // dataproc!: DataProcService;
  authService!: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onRegister(form: NgForm): void {
    if (!form.valid) {
      console.log('Formulario no válido');
      return; // Si el formulario no es válido, no continuar
    }

    const values = form.value as RegisterDataModel; // Asigna los valores del formulario al modelo

    // Verificar si las contraseñas coinciden
    if (values.password !== values.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // Si las contraseñas coinciden, realizar la llamada al backend
    this.authService.register(values).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.authService.setLogging(true);
        this.navigateTo('/login');
      },
      error: (err) => {
        console.error('Error en el registro', err);
      },
    });
  }

  // _checkName(value: string) {
  //   this.invalidName.set(true);
  //   return value.trim().length > 0;
  // }

  // _checkSurname(value: string) {
  //   this.invalidSurname.set(true);
  //   return value.trim().length > 0;
  // }

  // _checkBusinessName(value: string) {
  //   this.invalidBusinessName.set(true);
  //   return value.trim().length > 0;
  // }

  // _checkId(value: number) {
  //   this.invalidId.set(true);
  //   return Number(value) > 0;
  // }

  // onSubmit(form: NgForm) {
  //   console.log('valores del form');
  //   console.log(form.value);
  //   if (!form.valid) return;
  //   const url = 'http://localhost:3000/users';
  //   const values = form.value as RegisterDataModel;
  //   if (values.password !== values.confirmPassword) {
  //     this.passwordDoNotMatch.set(true);
  //     return;
  //   }

  //   this.dataproc.sendData(url, values).subscribe({
  //     next: (response) => {
  //       console.log('Data posted successfully', response);
  //       console.log(form);
  //       this.navigateTo('');
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
}
