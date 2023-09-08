import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppConfig } from './services/app-config.service';
import { CookieService } from 'ngx-cookie-service';
import { JWT_KEY } from './services/authorization.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AbobaComponent } from './components/aboba/aboba.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AbobaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken,
                allowedDomains:['localhost:5000']
            }
        }),
        FormsModule,
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppConfig,
            deps: [AppConfig],
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

function getToken() {
    return inject(CookieService).get(JWT_KEY);
}

function initializeAppConfig(appConfig: AppConfig) {
    return () => appConfig.load();
}
