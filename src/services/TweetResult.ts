import RequestProfile from '@/services/RequestProfile';
import Tweet from '@/models/Tweet';

export default class TweetResult {
    constructor(public request: RequestProfile, public tweets: Tweet[]) {
    }

    public toString(): string {
        return 'TweetResult';
    }
}
