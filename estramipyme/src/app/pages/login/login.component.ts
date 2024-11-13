import { Component, Inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onRememberMeChange(event: any) {
    this.authService.onRememberMeChange(event);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService
        .login(this.credentials, this.authService.rememberMe)
        .subscribe({
          next: (response) => {
            console.log('Inicio de sesión exitoso');
            this.authService.setLogging(true);
            this.navigateTo('');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Este usuario no existe o la contraseña es incorrecta. Intente de nuevo.',
            });
            console.log('Error en el inicio de sesión:', err);
          },
        });
    }
  }
}
