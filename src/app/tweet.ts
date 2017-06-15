class Tweet {
    constructor(
        public tweet_id: number,
        public in_reply_to_status_id: number | null,
        public in_reply_to_user_id: number | null,
        public timestamp: Date,
        public source: string,
        public text: string,
        public retweeted_status_id: number | null,
        public retweeted_status_user_id: number | null,
        public retweeted_status_timestamp: Date | null,
        public expanded_urls: string | null,
    ) {
        // code...
    }
}