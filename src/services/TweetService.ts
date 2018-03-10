import { LocalDate, LocalDateTime } from 'js-joda';
import Tweet from '@/models/Tweet';
import RequestProfile from '@/services/RequestProfile';
import TweetResult from '@/services/TweetResult';

export default class TweetService {
    public static fromJson(userName: string, node: any): Tweet {
        const identity = (x: string) => x;

        const tweetId = node.tweet_id;
        const timestamp = LocalDateTime.parse(node.timestamp);
        const inReplyToStatusId = TweetService.nullIfEmpty(node.in_reply_to_status_id, identity);
        const inReplyToUserId = TweetService.nullIfEmpty(node.in_reply_to_user_id, identity);
        const retweetedStatusId = TweetService.nullIfEmpty(node.retweeted_status_id, identity);
        const retweetedStatusUserId = TweetService.nullIfEmpty(node.retweeted_status_user_id, identity);
        const retweetedStatusTimestamp = TweetService.nullIfEmpty(node.retweeted_status_timestamp,
            LocalDateTime.parse);
        const expandedUrls = TweetService.nullIfEmpty(node.expanded_urls, identity);

        return new Tweet(userName, tweetId, timestamp, node.source, node.text,
                inReplyToStatusId, inReplyToUserId, retweetedStatusId, retweetedStatusUserId,
                retweetedStatusTimestamp, expandedUrls);
    }

    public static nullIfEmpty<T>(maybeEmpty: string, converter: (value: string) => T): T | null {
        return maybeEmpty === '' ? null : converter(maybeEmpty);
    }

    public findTweetsByDate(request: RequestProfile ): Promise<TweetResult> {
        const year = request.date.year();
        const month = ('0' + request.date.monthValue()).slice(-2);
        const dayOfMonth = ('0' + request.date.dayOfMonth()).slice(-2);

        const url = 'data/tweets/' + year + '-' + month + '-' + dayOfMonth + '.json';
        return fetch(url)
            .then((response) => response.status === 200 ? response.json() : Promise.reject(response.statusText))
            .then((data) => this.handleData(request, data));
    }

    public handleData(request: RequestProfile, data: any): Promise<TweetResult> {
        const tweets = Array.from(data.items)
                .map((item) => TweetService.fromJson(request.userName, item));
        const result = new TweetResult(request, tweets);
        return Promise.resolve(result);
    }
}
