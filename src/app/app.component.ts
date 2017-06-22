import { Component, Inject, OnInit } from '@angular/core';
import { environment } from "environments/environment";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [],
})
export class AppComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document) {
    }

    ngOnInit(): void {
        let bases = this.document.getElementsByTagName("base");
        if (bases.length > 0) {
            bases[0].setAttribute("href", environment.baseHref);
        }
    }
}

        