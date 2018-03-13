<template>
  <section class="card">
    <div class="card-content ">
      <div style="float: left">
        <img :src="image" width="48" height="48" />
      </div>
      <div class="tweet-body">
        <small class="grey-text text-darken-2">{{ auther }}</small>
        <p>{{ tweet.text }}</p>
        <small class="grey-text text-darken-2">
          <time><a target="_blank" :href="statusUrl" >{{ tweet.timestamp.format("yyyy-MM-dd HH:mm:ss") }}</a></time>
        </small>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Tweet from '../models/Tweet';

export default Vue.extend({
  name: 'Tweet',
  props: { 
    subject: Tweet,
  },
  computed: {
    image(): string {
      const userName = this.subject.isRetweet ? this.subject.retweetedUserName : this.subject.userName;
      return 'https://twitter.com/' + userName + '/profile_image?size=bigger';
    },
    auther(): string {
      const userName = this.subject.isRetweet ? this.subject.retweetedUserName : this.subject.userName;
      return '@' + userName;
    },
    statusUrl(): string {
      return 'https://twitter.com/' + this.subject.userName + '/status/' + this.subject.tweetId;
    },
  },
});
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