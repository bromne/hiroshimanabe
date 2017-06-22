import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { DateTime } from 'date-time-js';
import { Tweet } from "app/tweet";
import { LocalDate } from "js-joda/dist/js-joda";

@Injectable()
export class TweetService {
    constructor(private http: Http){
    }

    findTweetsByDate(request: RequestProfile): Promise<TweetResult> {
        let year = request.date.year();
        let month = ("0" + request.date.monthValue()).slice(-2);
        let dayOfMonth = ("0" + request.date.dayOfMonth()).slice(-2);
        return this.http.get("/data/tweets/" + year + "-" + month + "-" + dayOfMonth + ".json")
            .toPromise()
            .then(response => this.handleData(request, response))
            .catch(this.handleFailure);
    }

    handleData(request: RequestProfile, response: Response): Promise<TweetResult> {
        let json = response.json();
        json.items

        let tweets = Array.from(json.items)
                .map(item => TweetService.fromJson(request.userName, item));
        let result = new TweetResult(request, tweets);
        return Promise.resolve(result);
    }

    handleFailure(error: any): Promise<string> {
        return Promise.reject(error.toString());
    }

    static fromJson(userName: string, node: any): Tweet {
        let getNumber = (n: string) => TweetService.nullIfEmpty(n, Number.parseInt);

        let tweet_id = Number.parseInt(node.tweet_id);
        let timestamp = TweetService.parseDate(node.timestamp);
        let in_reply_to_status_id = getNumber(node.in_reply_to_status_id);
        let in_reply_to_user_id = getNumber(node.in_reply_to_user_id);
        let retweeted_status_id = getNumber(node.retweeted_status_id);
        let retweeted_status_user_id = getNumber(node.retweeted_status_user_id);
        let retweeted_status_timestamp = TweetService.nullIfEmpty(node.retweeted_status_timestamp, TweetService.parseDate);
        let expanded_urls = TweetService.nullIfEmpty(node.expanded_urls, s => s);
        
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
