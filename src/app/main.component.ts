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
    static startDate: LocalDate = LocalDate.of(2009, 12, 2);
    static endDate: LocalDate = LocalDate.of(2017, 5, 24);

    @ViewChild(CalendarComponent)
    calendar: CalendarComponent;

    request: RequestProfile;
    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService, private route: ActivatedRoute, private router: Router) {
        window.scrollTo(0, 0)
        this.route.params.subscribe(params => {
            let date = params["date"] ? Dates.from(params["date"]) : MainComponent.startDate;
            this.request = new RequestProfile("takeda25", date);
            this.loadData(this.request.date);
        })
    }

    ngOnInit(): void {
        this.calendar.value = this.request.date;
        this.calendar.setAvailableRange(MainComponent.startDate, MainComponent.endDate);

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
