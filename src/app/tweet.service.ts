import { DateTime } from 'date-time-js';
import { Tweet } from "./tweet";
import { LocalDate } from "js-joda/dist/js-joda";

export class TweetService {
    constructor(){
    }

    findTweetsByDate(request: RequestProfile): Promise<TweetResult> {
        let year = request.date.year();
        let month = ("0" + request.date.monthValue()).slice(-2);
        let dayOfMonth = ("0" + request.date.dayOfMonth()).slice(-2);

        let url = "data/tweets/" + year + "-" + month + "-" + dayOfMonth + ".json";
        return fetch(url)
            .then(response => response.json())
            .then(data => this.handleData(request, data));
    }

    handleData(request: RequestProfile, data: any): Promise<TweetResult> {
        let tweets = Array.from(data.items)
                .map(item => TweetService.fromJson(request.userName, item));
        let result = new TweetResult(request, tweets);
        return Promise.resolve(result);
    }

    static fromJson(userName: string, node: any): Tweet {
        let identity = (x: string) => x;
        
        let tweet_id = node.tweet_id;
        let timestamp = TweetService.parseDate(node.timestamp);
        let in_reply_to_status_id = TweetService.nullIfEmpty(node.in_reply_to_status_id, identity);
        let in_reply_to_user_id = TweetService.nullIfEmpty(node.in_reply_to_user_id, identity);
        let retweeted_status_id = TweetService.nullIfEmpty(node.retweeted_status_id, identity);
        let retweeted_status_user_id = TweetService.nullIfEmpty(node.retweeted_status_user_id, identity);
        let retweeted_status_timestamp = TweetService.nullIfEmpty(node.retweeted_status_timestamp, TweetService.parseDate);
        let expanded_urls = TweetService.nullIfEmpty(node.expanded_urls, identity);
        
        return new Tweet(userName, tweet_id, timestamp, node.source, node.text,
                in_reply_to_status_id, in_reply_to_user_id, retweeted_status_id, retweeted_status_user_id,
                retweeted_status_timestamp, expanded_urls);
    }

    static  parseDate(dateString: string): DateTime {
        let get = (from: number, length: number) => Number.parseInt(dateString.substr(from, length));

        let year = get(0, 4);
        let month = get(5, 2);
        let day = get(8, 2);
        let hour = get(11, 2);
        let minute = get(14, 2);
        let second = get(17, 2);
        let zone = dateString.substr(20, 5);

        let date = new DateTime(year, month - 1, day, hour, minute, second);
        return date;
    }

    static nullIfEmpty<T>(maybeEmpty: string, converter: (string) => T): T | null {
        return maybeEmpty === "" ? null : converter(maybeEmpty);
    }
}

export class RequestProfile {
    constructor(public userName: string, public date: LocalDate) {
    }
}

export class TweetResult {
    constructor(public request: RequestProfile, public tweets: Tweet[]) {
    }

    toString(): string {
        return "TweetResult";
    }
}
