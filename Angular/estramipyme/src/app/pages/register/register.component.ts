import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router!: Router;


  constructor(router: Router) {
    this.router = router;
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
