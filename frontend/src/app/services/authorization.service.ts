import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from 'src/models/authModel';
import { AppConfig } from './app-config.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from 'src/models/responses';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn:'root'
})
export class AuthorizationService{
    constructor(
        private httpCLient: HttpClient,
        private cookieService: CookieService,
        private router: Router,
        private jwtHelperService: JwtHelperService
    ){}

    login(loginModel: LoginModel): Observable<TokenResponse> {
        const request = this.httpCLient.post<TokenResponse>(
            `${AppConfig.settings.apiServerUrl}/account/login`,
            loginModel);

        return this.setJwt(request);
    }

    register(registerModel: RegisterModel): Observable<TokenResponse>{
        const request = this.httpCLient.post<TokenResponse>(
            `${AppConfig.settings.apiServerUrl}/account/register`,
            registerModel);

        return this.setJwt(request);
    }

    logOut(): void {
        this.cookieService.delete(JWT_KEY);
        this.router.navigate(['']);
    }

    isAuthorized(): boolean {
        const token = this.cookieService.get(JWT_KEY);
        return token != null && !this.jwtHelperService.isTokenExpired(token);
    }

    private setJwt(request : Observable<TokenResponse>) : Observable<TokenResponse> {
        request.subscribe(response => this.cookieService.set(JWT_KEY, response.token));

        return request;
    }
}

export const JWT_KEY = "jwt-key";
