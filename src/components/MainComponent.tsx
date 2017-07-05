import * as React from "react";

import { TweetService, RequestProfile, TweetResult } from "../app/tweet.service";
import { TweetComponent } from "../components/Tweet";
import { Dates } from "../app/util/data";
import { LocalDate } from "js-joda/dist/js-joda";
import { RouteProps } from "../app";
import materialize from "materialize-css";
// import CSSModules from "react-css-modules";

export class MainComponent extends React.Component<MainProps, TweetResult> {
    static startDate: LocalDate = LocalDate.of(2009, 12, 2);
    static endDate: LocalDate = LocalDate.of(2017, 5, 24);

    tweetService: TweetService;
    requestProfile: RequestProfile | null;

    constructor(props: MainProps) {
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
                            (this.state === null) ? (
                                <div className="progress" style={ { marginTop: "12em", marginBottom: "12em" } }>
                                    <div className="indeterminate"></div>
                                </div>
                            ) : (
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
                            )
                        }
                    </div>
                    {/*<calendar-control (change)="onDateChange($event)"></calendar-control>*/}
                </div>
            </section>
        );
    }

    componentDidMount(): void {
        this.tweetService = new TweetService();
        console.log("this.requestProfile");
        let date = this.props.match.params.date ? Dates.from(this.props.match.params.date) : MainComponent.startDate;
        // this.props.history.push("/d");
        this.requestProfile = new RequestProfile("takeda25", date);
        this.tweetService.findTweetsByDate(this.requestProfile)
            .then(tweets => this.setState(() => tweets))
            .catch(console.error);
        this.requestProfile = new RequestProfile("takeda25", MainComponent.startDate);
    }
}

export interface MainProps extends RouteProps<{ date: string | null }> {
}

