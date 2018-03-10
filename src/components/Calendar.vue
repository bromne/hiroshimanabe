<template>
    <div class="datepicker">
      <section class="z-depth-2">
          <div class="day teal darken-1 white-text">{{ dayString }}</div>
          <div class="date teal lighten-1 white-text">{{ dateString }}</div>
          <div class="year-and-month">
              <div class="year middle">
                  <!--  this.setYearMonth(this.state.year + 1, this.state.month) -->
                  <div class="arrow" @click="setYearMonth(year + 1, month)">
                      <div>▲</div>
                  </div>
                  <div>{{ state.year }}</div>
                  <!--  this.setYearMonth(this.state.year - 1, this.state.month) -->
                  <div class="arrow" @click="setYearMonth(year - 1, month)">
                      <div>▼</div>
                  </div>
              </div>
              <div class="middle" style="paddingRight: 0.5em">年</div>
              <div class="month middle">
                  <!-- this.setYearMonth(this.state.year, this.state.month + 1) -->
                  <div class="arrow" @click="setYearMonth(year, month + 1)">
                      <div>▲</div>
                  </div>
                  <div>{{ ("0" + (state.month)).slice(-2) }}</div>
                  <!-- this.setYearMonth(this.state.year, this.state.month - 1) -->
                  <div class="arrow" @click="setYearMonth(year, month - 1)" >
                      <div>▼</div>
                  </div>
              </div>
              <div class="middle">月</div>
          </div>
          <table class="calendar">
              <thead>
              <tr>
                  <td class="sunday">日</td>
                  <td>月</td>
                  <td>火</td>
                  <td>水</td>
                  <td>木</td>
                  <td>金</td>
                  <td class="saturday">土</td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="{week, i} in dateArray" :key="i">
                  <td v-for="{date, j} in week" :key="j" @click="onDateClick"
                      :class="{
                        selectable: isAvailableDate(date),
                        selected: isSelected(date)
                       }">
                    {{ date ? date.dayOfMonth() : <span>&nbsp;</span> }}
                  </td>
                </tr>
              </tbody>
          </table>
      </section>
      <div class="buttons">
          <button class="waves-effect waves-light btn-large"
              :class="{ disabled: isAvailableDate(value.plusDays(-1)) }"
              style="float: left"
              @click="shiftDate(-1)">前の日</button>
          <button class="waves-effect waves-light btn-large"
              :class="{ disabled: isAvailableDate(value.plusDays(1)) }"
              style="float: right"
              @click="shiftDate(1)">次の日</button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Calendar',
  props: {},
  computed: {},
});
</script>

<style lang="scss" scoped>
.day {
  padding: 10px;
  font-size: 1rem;
  text-align: center;
}

.date {
  padding: 25px;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
}

.year-and-month {
  display: table;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  text-align: center;

  .middle {
    display: table-cell;
    vertical-align: middle;
  }

  .arrow {
    margin: 0 auto;

    width: 32px;
    height: 32px;

    user-select: none;

    div {
      width: inherit;
      height: inherit;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      font-size: x-small;
    }

    &:hover {
      border-radius: 50%;
      background-color: #eee;

      cursor: pointer;
    }
  }
}

table.calendar {
  box-sizing: content-box;
  padding: 10px;

  border-collapse: unset;

  @mixin cell() {
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;

    user-select: none;
  }

  thead {
    tr td {
      @include cell();

      font-weight: bold;
    }
  }

  tbody {
    tr {
      td {
        @include cell();

        &:not(.selectable) {
          color: #bdbdbd;
        }

        &.selectable:hover:not(.selected) {
          border-radius: 50%;
          background-color: #eee;

          cursor: pointer;
        }

        &.selected {
          border-radius: 50%;
          transform: scale(0.9);
          background-color: #26a69a;
          color: white;
        }
      }
    }
  }

  .sunday {
    color: #f44336;
  }

  .saturday {
    color: #2196f3;
  }
}

.buttons {
  margin-top: 0.5rem;

  button {
    width: 49%;
  }
}
</style>
