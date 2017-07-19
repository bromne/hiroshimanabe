import * as React from "react";
import { Tweet } from "app/tweet";
import "./tweet.component.scss";

export class TweetComponent extends React.Component<{ tweet: Tweet }, any> {
    constructor(props: { tweet: Tweet }) {
        super(props);
    }

    render() {
        return (
            <section className="card">
                <div className="card-content ">
                    <div style={ { float: "left" } }>
                        <img src={ this.image } width="48" height="48" />
                    </div>
                    <div className="tweet-body">
                        <small className="grey-text text-darken-2">{ this.auther }</small>
                        <p>{ this.tweet.text }</p>
                        <small className="grey-text text-darken-2">
                            <time><a target="_blank" href={ this.statusUrl } >{ this.tweet.timestamp.format("yyyy-MM-dd HH:mm:ss") }</a></time>
                        </small>
                    </div>
                </div>
            </section>
        );
    }

    get tweet(): Tweet {
        return this.props.tweet;
    }

    get image(): string {
        let user_name = this.tweet.isRetweet ? this.tweet.retweeted_user_name : this.tweet.user_name;
        return "https://twitter.com/" + user_name + "/profile_image?size=bigger";
    }

    get auther() {
        let userName = this.tweet.isRetweet ? this.tweet.retweeted_user_name : this.tweet.user_name;
        return "@" + userName;
    }

    get statusUrl() {
        return "https://twitter.com/" + this.tweet.user_name + "/status/" + this.tweet.tweet_id;
    }
}
