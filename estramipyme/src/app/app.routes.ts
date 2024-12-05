import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from '@pages/register/register.component';
import { ResetPasswordComponent } from '@pages/components/reset-password/reset-password.component';
import { ResetPasswordRequestComponentTsComponent } from '@pages/components/reset-password-request/reset-password-request.component.ts/reset-password-request.component';

export const routes: Routes = [
  // {path: "login", component: LoginComponent},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'reset-password-request',
    component: ResetPasswordRequestComponentTsComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
];
