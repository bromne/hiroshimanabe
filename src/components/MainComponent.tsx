import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { TweetService, RequestProfile, TweetResult } from "../app/tweet.service";
import { TweetComponent } from "../components/TweetComponent";
import { CalendarComponent } from "../components/CalendarComponent";
import { Dates } from "../app/util/data";
import { LocalDate } from "js-joda";
import { AppComponent } from "../app/AppComponent";

import "./main.component.scss";

export class MainComponent extends AppComponent<Props, State> {
    static startDate: LocalDate = LocalDate.of(2009, 12, 2);
    static endDate: LocalDate = LocalDate.of(2017, 5, 24);

    tweetService: TweetService;

    constructor(props: Props) {
        super(props);
    }
    
    render() {
        return (
            <section className="container">
                <div style={ { textAlign: "center" } }>
                    <h4>@{ this.requestProfile && this.requestProfile.userName || null } のツイート</h4>
                </div>
                <div>
                    <div className="result">
                        {
                            (this.state && this.state.tweets) ? (
                                (this.state.tweets.length > 0) ? (
                                    <ul>
                                        {
                                            this.state.tweets.map(tweet => (
                                                <li key={tweet.tweet_id} >
                                                    <TweetComponent tweet={tweet} />
                                                </li>
                                            ))
                                        }
                                        <div className="sentinel">
                                            <img src="assets/twitter.png" width="48" height="48" style={ { filter: "grayscale(100%)" } } />
                                        </div>
                                    </ul>
                                ) : (
                                    <section className="no-items">
                                        <p>なにもありません</p>
                                    </section>
                                )
                            ) : (
                                <div className="progress" style={ { marginTop: "12em", marginBottom: "12em" } }>
                                    <div className="indeterminate"></div>
                                </div>
                            )
                        }
                    </div>
                    <div className="calendar">
                        <CalendarComponent
                            initialValue={ this.date }
                            start={ MainComponent.startDate }
                            end={ MainComponent.endDate }
                            onChange={ e => this.onDateChange(e) } />
                    </div>
                </div>
            </section>
        );
    }

    componentWillMount(): void {
        this.tweetService = new TweetService();
        this.componentDidReceiveProps();
    }

    componentDidReceiveProps(): void {
        this.tweetService.findTweetsByDate(this.requestProfile)
            .then(tweets => this.setState(() => tweets))
            .catch(error => {
                console.error(error);
                this.setState(new TweetResult(this.requestProfile, []));
            });
    }

    onDateChange(date: LocalDate): void {
        let path = "/" + Dates.format(date);
        this.setState(() => null);
        this.props.history.push(path);
    }

    get date(): LocalDate {
        return this.props.match.params.date ? Dates.from(this.props.match.params.date) : MainComponent.startDate;
    }

    get requestProfile(): RequestProfile {
         return new RequestProfile("takeda25", this.date);
    }
}

type Props = RouteComponentProps<{ date: string | null }>;

type State = TweetResult;

