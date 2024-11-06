import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DataProcService } from '@services/data-proc.service';
import { RegisterDataModel } from '@models/registerdata.models';
import { GlobalProviderService } from '@services/global-provider.service';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          console.log("Inicio de sesión exitoso");
          this.authService.setLogging(true);
          this.navigateTo("/continuar")
        },
        error: (err) => {
          console.log('Error en el inicio de sesión:', err);
        },
      });
    }
  }
}
