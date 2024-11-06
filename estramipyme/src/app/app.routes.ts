import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from '@pages/register/register.component';
import { ComenzarTestComponent } from '@pages/components/comenzar-test/comenzar-test.component';
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
    path: 'continuar',
    component: ComenzarTestComponent,
  },
];
