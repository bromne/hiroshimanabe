import { LocalDateTime } from 'js-joda';

export default class Tweet {
    public static RETWEET: RegExp = /^RT @([a-zA-Z0-9_]+)\: /;

    public text: string;
    public retweetedUserName: string | null;

    constructor(
        public userName: string,
        public tweetId: string,
        public timestamp: LocalDateTime,
        public source: string,
        text: string,
        public inReplyToStatusId: string | null,
        public inReplyToUserId: string | null,
        public retweetedStatusId: string | null,
        public retweetedStatusUserId: string | null,
        public retweetedStatusTimestamp: LocalDateTime | null,
        public expandedUrls: string | null,
    ) {
        if (this.isRetweet) {
            const result = text.match(Tweet.RETWEET);
            this.text = text.slice(result ? result[0].length : 0);
            this.retweetedUserName = result ? result[1] : '';
        } else {
            this.text = text;
            this.retweetedUserName = null;
        }
    }

    get isRetweet(): boolean {
        return this.retweetedStatusId !== null;
    }

    public toString(): string {
        return this.userName + '/' + this.tweetId.toString();
    }
}
