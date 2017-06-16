import { DateTime } from 'date-time-js';

export class Tweet {
    static RETWEET: RegExp = /^RT @([a-zA-Z0-9_]+)\: /;
    
    public text : string;
    public retweeted_user_name : string | null;

    constructor(
        public user_name : string,
        public tweet_id: number,
        public timestamp: DateTime,
        public source: string,
        text: string,
        public in_reply_to_status_id: number | null,
        public in_reply_to_user_id: number | null,
        public retweeted_status_id: number | null,
        public retweeted_status_user_id: number | null,
        public retweeted_status_timestamp: DateTime | null,
        public expanded_urls: string | null,
    ) {
        if (this.isRetweet) {
            let result = text.match(Tweet.RETWEET);
            this.text = text.slice(result ? result[0].length : 0);
            this.retweeted_user_name = result ? result[1] : "";
        } else {
            this.text = text;
            this.retweeted_user_name = null;
        }
    }

    get isRetweet(): boolean {
        return this.retweeted_status_id !== null;
    }

    toString(): string {
        return this.user_name + "/" + this.tweet_id.toString();
    }
}