import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { DateTime } from 'date-time-js';
import { Tweet } from "app/tweet";

@Injectable()
export class TweetService {
    constructor(private http: Http){
    }

    findTweetsByDate(request: RequestProfile): Promise<TweetResult> {
        return this.http.get("/data/tweets/2017-04-01.json")
            .toPromise()
            .then(response => this.handleData(request, response))
            .catch(this.handleFailure);
    }

    handleData(request: RequestProfile, response: Response): Promise<TweetResult> {
        let json = response.json();
        json.items

        let tweets = Array.from(json.items).map(TweetService.fromJson);
        let result = new TweetResult(request, tweets);
        return Promise.resolve(result);
    }

    handleFailure(error: any): Promise<string> {
        return Promise.reject(error.toString());
    }

    static fromJson(node: any): Tweet {
        let getNumber = (n: string) => TweetService.nullIfEmpty(n, Number.parseInt);

        let tweet_id = Number.parseInt(node.tweet_id);
        let timestamp = DateTime.parse(node.timestamp);
        let in_reply_to_status_id = getNumber(node.in_reply_to_status_id);
        let in_reply_to_user_id = getNumber(node.in_reply_to_user_id);
        let retweeted_status_id = getNumber(node.retweeted_status_id);
        let retweeted_status_user_id = getNumber(node.retweeted_status_user_id);
        let retweeted_status_timestamp = TweetService.nullIfEmpty(node.retweeted_status_timestamp, DateTime.parse);
        let expanded_urls = TweetService.nullIfEmpty(node.expanded_urls, s => s);
        
        return new Tweet(tweet_id, timestamp, node.source, node.text,
                in_reply_to_status_id, in_reply_to_user_id, retweeted_status_id, retweeted_status_user_id,
                retweeted_status_timestamp, expanded_urls);
    }

    static nullIfEmpty<T>(maybeEmpty: string, converter: (string) => T): T | null {
        return maybeEmpty === "" ? null : converter(maybeEmpty);
    }
}

export class RequestProfile {
    constructor(public userName: string, public date: DateTime) {
    }
}

export class TweetResult {
    constructor(public request: RequestProfile, public tweets: Tweet[]) {
    }

    toString(): string {
        return "TweetResult";
    }
}
