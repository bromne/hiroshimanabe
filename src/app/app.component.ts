import { Component } from '@angular/core';
import { TweetService } from './tweet.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(tweetService: TweetService) {
    }
}
