import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password-request.component.ts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css',
})
export class ResetPasswordRequestComponentTsComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  requestReset(): void {
    this.authService.requestPasswordReset(this.email).subscribe(
      (response) => {
        this.message = response.message; // Mensaje de éxito
      },
      (error) => {
        this.errorMessage =
          error.error.message ||
          'Hubo un problema al solicitar el restablecimiento.';
      }
    );
  }
}
