import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetService, RequestProfile, TweetResult } from 'app/tweet.service'
import { DateTime } from "date-time-js/date-time";
import { TweetComponent } from "app/tweet.component";
import { CalendarComponent } from "app/calendar.component";
import { LocalDate } from "js-joda/dist/js-joda";
import { Dates } from "app/util/data";

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [TweetService],
})
export class MainComponent implements OnInit {

    @ViewChild(CalendarComponent)
    calendar: CalendarComponent;

    request: RequestProfile;
    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            LocalDate.of(2009, 12, 2);
            let date = params["date"] ? Dates.from(params["date"]) : LocalDate.of(2009, 12, 2);
            this.request = new RequestProfile("takeda25", date);
            this.loadData(this.request.date);
        })
    }

    ngOnInit(): void {
        this.calendar.value = this.request.date;
        this.onDateChange(this.request.date);
    }

    onDateChange(date: LocalDate) {
        this.router.navigate(["/tweets", Dates.format(date)])
    }

    private loadData(date: LocalDate) {
        this.tweetService.findTweetsByDate(this.request)
            .then(result => {
                this.tweetResult = result;
            })
            .catch(e => {
                this.tweetResult = new TweetResult(this.request, []);
            });
    }
}
