import { Component } from '@angular/core';
import { AbobaService } from 'src/app/services/aboba.service';

@Component({
  selector: 'app-aboba',
  templateUrl: './aboba.component.html',
  styleUrls: ['./aboba.component.css']
})
export class AbobaComponent {
    aboba: string = '';

    constructor(
        private abobaService: AbobaService
    ) { }

    initAboba() {
        this.abobaService.getAboba().subscribe(response => {
            this.aboba = response.result
        });
    }
}
