import { Component, Input } from '@angular/core';
import { Tweet } from "app/tweet";

@Component({
    selector: 'tweets-item',
    templateUrl: './tweet.component.html',
    styleUrls: ["./tweet.component.scss"],
})
export class TweetComponent {
    @Input() tweet: Tweet

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
