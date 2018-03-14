<template>
  <section class="card">
    <div class="card-content ">
      <div style="float: left">
        <img :src="image" width="48" height="48" />
      </div>
      <div class="tweet-body">
        <small class="grey-text text-darken-2">{{ auther }}</small>
        <p>{{ subject.text }}</p>
        <small class="grey-text text-darken-2">
          <time><a target="_blank" :href="statusUrl" >{{ timestamp }}</a></time>
        </small>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import Tweet from '@/models/Tweet';
import { DateTimeFormatter } from 'js-joda';

@Component
export default class TweetComponent extends Vue {
  public static FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');

  @Prop()
  public subject!: Tweet;

  get image(): string {
    const userName = this.subject.isRetweet ? this.subject.retweetedUserName : this.subject.userName;
    return 'https://twitter.com/' + userName + '/profile_image?size=bigger';
  }
  get auther(): string {
    const userName = this.subject.isRetweet ? this.subject.retweetedUserName : this.subject.userName;
    return '@' + userName;
  }

  get statusUrl(): string {
    return 'https://twitter.com/' + this.subject.userName + '/status/' + this.subject.tweetId;
  }

  get timestamp(): string {
    return this.subject.timestamp.format(TweetComponent.FORMATTER);
  }
}
</script>

<style scoped lang="scss">
.card {
  .tweet-body {
    padding-left: 10px;
    overflow:hidden;
  }

  .card-content {
    padding: 16px;
  }
}
</style>