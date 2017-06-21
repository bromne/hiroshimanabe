import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { TweetService, RequestProfile, TweetResult } from 'app/tweet.service'
import { DateTime } from "date-time-js/date-time";
import { TweetComponent } from "app/tweet.component";
import { CalendarComponent } from "app/calendar.component";
import { LocalDate } from "js-joda/dist/js-joda";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TweetService],
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild(CalendarComponent)
    calendar: CalendarComponent;

    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService, private elementRoot: ElementRef) {
    }

    ngOnInit(): void {
        let date = LocalDate.of(2012, 3, 1);
        this.calendar.value = date;
        this.onDateChange(date);
    }

    ngAfterViewInit(): void {
        this.elementRoot.nativeElement
    }

    onDateChange(date: LocalDate) {
        this.tweetResult = null;
        let request = new RequestProfile("takeda25", date);
        this.tweetService.findTweetsByDate(request)
            .then(result => {
                this.tweetResult = result;
            })
            .catch(e => {
                this.tweetResult = new TweetResult(request, []);
            });
    }
}
