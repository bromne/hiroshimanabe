<template>
  <div class="datepicker">
    <section class="z-depth-2">
      <div class="day teal darken-1 white-text">{{ dayString }}</div>
      <div class="date teal lighten-1 white-text">{{ dateString }}</div>
      <div class="year-and-month">
        <div class="year middle">
          <div class="arrow" @click="setYearMonth(year + 1, month)">
            <div>▲</div>
          </div>
          <div>{{ state.year }}</div>
          <div class="arrow" @click="setYearMonth(year - 1, month)">
            <div>▼</div>
          </div>
        </div>
        <div class="middle" style="paddingRight: 0.5em">年</div>
        <div class="month middle">
          <div class="arrow" @click="setYearMonth(year, month + 1)">
            <div>▲</div>
          </div>
          <div>{{ ("0" + (state.month)).slice(-2) }}</div>
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
              }">{{ date ? date.dayOfMonth() : <span>&nbsp;</span> }}
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
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import { LocalDate } from 'js-joda';

const DAYS: string[] = ['日', '月', '火', '水', '木', '金', '土'];

function dateArrayOf(year: number, month: number): Array<Array<LocalDate | null>> {
  const first = new Date(year, month - 1);
  const endOfMonth = (() => {
    const date = new Date(year, month);
    date.setDate(0);
    return date.getDate();
  })();

  const calendar: Array<Array<LocalDate | null>> = [];
  const dayOffset = first.getDay();
  for (let line = 0; line < 6; line++) {
    const headDay = (line * 7) - dayOffset + 1;

    const cells: Array<LocalDate | null> = [];
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const day = headDay + dayOfWeek;
      cells.push(day > 0 && day <= endOfMonth ? LocalDate.of(year, month, day) : null);
    }
    calendar.push(cells);
  }
  return calendar;
}

@Component
export default class CalendarComponent extends Vue {
  @Prop()
  public initialValue!: LocalDate;

  @Prop()
  public start!: LocalDate;

  @Prop()
  public end!: LocalDate;

  @Inject()
  public value!: LocalDate;

  @Inject()
  public year!: number;

  @Inject()
  public month!: number;

  @Prop()
  public datePredicate: (date: LocalDate) => boolean = (e) => true

  get dateString(): string {
    const year = this.value.year();
    const month = ('0' + this.value.monthValue()).slice(-2);
    const date = ('0' + this.value.dayOfMonth()).slice(-2);
    return year + '/' + month + '/' + date;
  }

  get dayString(): string {
    return DAYS[this.value.dayOfWeek().value() % 7] + '曜日';
  }

  get dateArray(): Array<Array<LocalDate | null>> {
    return dateArrayOf(this.year, this.month);
  }

  public setYearMonth(year: number, month: number): void {
    const changed = new Date(year, month - 1);

    this.year = changed.getFullYear();
    this.month = changed.getMonth() + 1;
  }

  public isSelected(dayOfMonth: LocalDate | null): boolean {
    if (dayOfMonth === null) {
      return false;
    } else {
      return this.value.equals(dayOfMonth);
    }
  }

  public isAvailableDate(date: LocalDate | null): boolean {
    if (date === null) {
      return false;
    } else {
      return (this.start ? !this.start.isAfter(date) : true)
        && (this.end ? !this.end.isBefore(date) : true)
        && (this.datePredicate ? this.datePredicate(date) : true);
    }
  }

  public onDateClick(date: LocalDate | null): void {
    if (date !== null && this.isAvailableDate(date)) {
      this.value = date;
    }
  }

  public shiftDate(value: number): void {
    const shifted = this.value.plusDays(value);
    if (this.isAvailableDate(shifted)) {
      this.value = shifted;
    }
  }

  private computeDate(dayOfMonth: number): LocalDate {
    return LocalDate.of(this.year, this.month, dayOfMonth);
  }
}
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
