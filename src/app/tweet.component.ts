import { Component } from '@angular/core';

@Component({
    selector: 'tweets-item',
    templateUrl: './tweet.component.html',
    styleUrls: []
})


export class TweetComponent {
    userName: string;
    displayName: string;
    message: string;
    date: Date;
    image(): string { throw ""; }
}
