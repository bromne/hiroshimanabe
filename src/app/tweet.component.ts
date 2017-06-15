import { Component, Input } from '@angular/core';
import { Tweet } from "app/tweet";

@Component({
    selector: 'tweets-item',
    templateUrl: './tweet.component.html',
    styleUrls: [],
})
export class TweetComponent {
    @Input() tweet: Tweet
}
