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

    date: LocalDate;
    tweetResult: TweetResult | null = null;

    constructor(private tweetService: TweetService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            LocalDate.of(2009, 12, 2);
            let date = params["date"];
            this.date = date ? Dates.from(date) : LocalDate.of(2009, 12, 2);
            this.loadData(this.date);
        })
    }

    ngOnInit(): void {
        this.calendar.value = this.date;
        this.onDateChange(this.date);
    }

    onDateChange(date: LocalDate) {
        this.router.navigate(["/tweets", Dates.format(date)])
    }

    private loadData(date: LocalDate) {
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
