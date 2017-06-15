import { Component, OnInit } from '@angular/core';
import { TweetService, RequestProfile, TweetResult } from 'app/tweet.service'
import { DateTime } from "date-time-js/date-time";
import { TweetComponent } from "app/tweet.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TweetService],
})
export class AppComponent implements OnInit {
    tweetResult: TweetResult = new TweetResult(new RequestProfile("",new DateTime()), []);
    constructor(private tweetService: TweetService) {
    }

    ngOnInit() {
        let request = new RequestProfile("takeda25", new DateTime());
        this.tweetService.findTweetsByDate(request)
            .then(result => {
                this.tweetResult = result;
            })
            .catch(e => {
                console.log(e);
            });
    }
}
