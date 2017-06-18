import { Component, Input } from '@angular/core';
import { LocalDate } from 'js-joda';

@Component({
    selector: 'calendar-control',
    templateUrl: './calendar.component.html',
    styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
    days: string[] = ["日", "月", "火", "水", "木", "金", "土"];

    datePredicate: (DateTime) => boolean = (date: LocalDate) => !date.isAfter(LocalDate.now());
    value: LocalDate;

    year: number;
    month: number;

    constructor() {
        this.value = LocalDate.now();

        this.year = this.value.year();
        this.month = this.value.monthValue();
    }

    get dateString(): string {
        let year = this.value.year();
        let month = ("0" + this.value.monthValue()).slice(-2);
        let date = ("0" + this.value.dayOfMonth()).slice(-2);
        return year + "/" + month + "/" + date;
    }

    get dayString(): string {
        return this.days[this.value.dayOfWeek().value() % 7] + "曜日";
    }

    get dateArray(): (number | null)[][] {
        return CalendarComponent.dateArrayOf(this.year, this.month);
    }

    isSelected(dayOfMonth: number | null): boolean {
        if (dayOfMonth === null)
            return false;
        else
            return this.value.equals(this.computeDate(dayOfMonth));
    }

    isAvailableDate(dayOfMonth: number | null) {
        if (dayOfMonth === null)
            return false;
        else
            return this.datePredicate(this.computeDate(dayOfMonth));
    }

    onDateClick(date: number): void {
        this.value = this.computeDate(date);
    }

    setYearMonth(year: number, month: number): void {
        let changed = new Date(year, month - 1);
        this.year = changed.getFullYear();
        this.month = changed.getMonth() + 1;
    }

    private computeDate(dayOfMonth: number): LocalDate {
        return LocalDate.of(this.year, this.month, dayOfMonth);
    }

    static dateArrayOf(year: number, month: number): (number | null)[][] {
        let first = new Date(year, month - 1);
        let end_of_month = (() => {
            let date = new Date(year, month);
            date.setDate(0);
            return date.getDate();
        })();

        let calendar: (number | null)[][] = []
        let day_offset = first.getDay();
        for (var line = 0; line < 6; line++) {
            var head_date = (line * 7) - day_offset + 1;
            // if (head_date <= end_of_month) {
                let cells: (number | null)[] = [];
                for (var day_of_week = 0; day_of_week < 7; day_of_week++) {
                    var date = head_date + day_of_week;
                    cells.push(date > 0 && date <= end_of_month ? date : null)
                }
                calendar.push(cells);
            // } else {
            //     return calendar;
            // }
        }
        return calendar;
    }
}
