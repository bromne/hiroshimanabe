import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetService, RequestProfile, TweetResult } from 'app/tweet.service'
import { DateTime } from "date-time-js/date-time";
import { TweetComponent } from "app/tweet.component";
import { CalendarComponent } from "app/calendar.component";
import { LocalDate } from "js-joda/dist/js-joda";

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [TweetService],
})
export class MainComponent implements OnInit {

    @ViewChild(CalendarComponent)
    calendar: CalendarComponent;

    date: LocalDate;
    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            LocalDate.of(2009, 12, 2);
            let date = params["date"];
            this.date = date ? MainComponent.dateFrom(date) : LocalDate.of(2009, 12, 2);
        })
    }

    ngOnInit(): void {
        this.calendar.value = this.date;
        this.onDateChange(this.date);
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

    static dateFrom(value: string): LocalDate {
        let get = (from: number, length: number) => Number.parseInt(value.substr(from, length));

        let year = get(0, 4);
        let month = get(5, 2);
        let day = get(8, 2);
        return LocalDate.of(year, month, day);
    }
}
