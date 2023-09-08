import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.service';
import { Observable } from 'rxjs';
import { ResultResponse } from 'src/models/responses';

@Injectable({
  providedIn: 'root'
})
export class AbobaService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getAboba(): Observable<ResultResponse<string>> {
        return this.httpClient.get<ResultResponse<string>>(`${AppConfig.settings.apiServerUrl}/aboba/aboba`);
    }
}
