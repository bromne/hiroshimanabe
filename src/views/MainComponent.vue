<template>
  <section class="container">
    <div style="textAlign: center">
      <h4>@{{ this.requestProfile && this.requestProfile.userName || null }} のツイート</h4>
    </div>
    <div>
      <div class="result">
        <ul v-if="result && result.tweets.length > 0">
          <li v-for="(tweet, i) in result.tweets" :key="i">
            <TweetComponent :subject="tweet" />
          </li>
          <div class="sentinel">
            <img src="../assets/twitter.png" width="48" height="48" style="filter: grayscale(100%)" />
          </div>
        </ul>
        <section v-else-if="result" class="no-items">
          <p>なにもありません</p>
        </section>
        <div v-else class="progress" style="marginTop: 12em, marginBottom: 12em">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div class="calendar">
        <CalendarComponent
          :initialValue="date"
          :start="startDate"
          :end="endDate"
          @change="onDateChange" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject, Emit } from 'vue-property-decorator';
import { LocalDate } from 'js-joda';
import TweetService from '@/services/TweetService';
import RequestProfile from '@/services/RequestProfile';
import TweetResult from '@/services/TweetResult';
import { Dates } from '@/utils/Dates';
import CalendarComponent from '@/components/CalendarComponent.vue';
import TweetComponent from '@/components/TweetComponent.vue';

@Component({ components: { CalendarComponent, TweetComponent } })
export default class MainComponent extends Vue {
  public startDate!: LocalDate;
  public endDate!: LocalDate;

  public result: TweetResult | null = null;

  private tweetService!: TweetService;
  private date!: LocalDate;

  get requestProfile(): RequestProfile {
    return new RequestProfile('takeda25', this.date);
  }

  public data() {
    return {
      date: this.$route.params.date ? Dates.from(this.$route.params.date) : this.startDate,
    };
  }

  public beforeCreate(): void {
    this.startDate = LocalDate.of(2009, 12, 2);
    this.endDate = LocalDate.of(2017, 5, 24);
  }

  public beforeMount(): void {
    this.tweetService = new TweetService();
    this.update();
  }

  public beforeRouteUpdate(to: any, from: any, next: () => void): void {
    this.date = to.params.date ? Dates.from(to.params.date) : this.startDate;
    this.update();
    next();
  }

  @Emit()
  public onDateChange(date: LocalDate): void {
    const path = '/' + Dates.format(date);
    this.result = null;
    this.$router.push(path);
  }

  private update() {
    this.tweetService.findTweetsByDate(this.requestProfile)
      .then((tweets) => this.result = tweets)
      .catch((error) => this.result = new TweetResult(this.requestProfile, []));
  }
}
</script>

<style lang="scss">
$column_unit: 20rem;

@mixin column() {
  float: left;
  box-sizing: border-box;
  padding: 0 0.75rem;
}

.container {
  margin: 0 auto;
  box-sizing: content-box;
  padding: 0 1.50rem;
  width: $column_unit * 3;
  
  .result {
    @include column();
    
    width: $column_unit * 2;

    ul {
      margin-top: 0;
    }
  }

  div.calendar {
    @include column();
    margin-left: $column_unit * 2;
    position: fixed;
    width: $column_unit;
  }   
}

.sentinel {
  text-align: center;
  margin: 2.5rem 0 3.5rem;
}

.no-items {
  padding: 3.5rem 0;

  p {
    text-align: center;
    color: #9e9e9e;
  }
}
</style>
