import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RegisterModel } from 'src/models/authModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerModel: RegisterModel = {
        username: '',
        email: '',
        password: '',
    };

    constructor(
        private authorizationService: AuthorizationService,
        private router: Router
    ) { }

    login(): void {
        this.authorizationService.register(this.registerModel);
        this.router.navigate(['']);
    }
}
