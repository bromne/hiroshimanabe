import { Component, OnInit, ViewChild } from '@angular/core';
import { TweetService, RequestProfile, TweetResult } from 'app/tweet.service'
import { DateTime } from "date-time-js/date-time";
import { TweetComponent } from "app/tweet.component";
import { CalendarComponent } from "app/calendar.component";
import { LocalDate } from "js-joda/dist/js-joda";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TweetService],
})
export class AppComponent implements OnInit {

    @ViewChild(CalendarComponent)
    calendar: CalendarComponent;

    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService) {
    }

    ngOnInit() {
        let date = LocalDate.of(2012, 3, 1);
        this.calendar.value = date;

        let request = new RequestProfile("takeda25", date);
        this.tweetService.findTweetsByDate(request)
            .then(result => {
                this.tweetResult = result;
            })
            .catch(e => {
                console.log(e);
            });
    }
}
