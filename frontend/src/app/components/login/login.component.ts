import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { LoginModel } from 'src/models/authModel';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginModel: LoginModel = {
        username: '',
        password:''
    };

    constructor(
        private authorizationService: AuthorizationService,
        private router: Router
    ) { }

    login(): void {
        this.authorizationService.login(this.loginModel);
        this.router.navigate(['']);
    }
}
