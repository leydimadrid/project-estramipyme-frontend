import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataProcService } from '@services/data-proc.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterDataModel } from '@models/registerdata.models';
import { AuthService } from '@services/auth.service';
import { TypeDocument } from '../../enums/typedocument.enum';
import { Sector } from '../../enums/sector2.enum';
import { TypeUser } from '../../enums/typeuser.enum';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  router!: Router;
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado exitosamente!',
          showConfirmButton: false,
          timer: 2000,
        });
        console.log('Registro exitoso', response);
        this.authService.setLogging(true);
        this.navigateTo('/login');
      },
      error: (err) => {
        console.error('Error en el registro', err);
      },
    });
  }
}
