import { DateTime } from 'date-time-js';

export class Tweet {
    public user_name : string;
    public retweeted_user_name : string | null;

    constructor(
        public tweet_id: number,
        public timestamp: DateTime,
        public source: string,
        public text: string,
        public in_reply_to_status_id: number | null,
        public in_reply_to_user_id: number | null,
        public retweeted_status_id: number | null,
        public retweeted_status_user_id: number | null,
        public retweeted_status_timestamp: DateTime | null,
        public expanded_urls: string | null,
    ) {
        // code...
    }
}