import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from 'src/models/appConfig';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;

    constructor(private httpClient: HttpClient) { }

    async load(): Promise<void> {
        const configPath = 'assets/config/config.json';
        await this.httpClient.get<IAppConfig>(configPath).subscribe(response => {
            AppConfig.settings = response;
        });
    }
}
