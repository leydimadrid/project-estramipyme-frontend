import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token']; // Obtener el token de la URL
  }

  resetPassword(): void {
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      (response) => {
        this.message = response.message;
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirigir al login después de éxito
      },
      (error) => {
        this.errorMessage =
          error.error.message ||
          'Hubo un problema al restablecer la contraseña.';
      }
    );
  }
}
