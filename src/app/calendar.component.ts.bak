import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalDate } from 'js-joda';

@Component({
    selector: 'calendar-control',
    templateUrl: './calendar.component.html',
    styleUrls: ["./calendar.component.scss"],
    
})
export class CalendarComponent {
    @Output() change: EventEmitter<LocalDate> = new EventEmitter();

    static days: string[] = ["日", "月", "火", "水", "木", "金", "土"];

    datePredicate: (DateTime) => boolean = (date: LocalDate) => true;
    _value: LocalDate;

    year: number;
    month: number;

    start: LocalDate | null;
    end: LocalDate | null;

    constructor() {
        this.value = LocalDate.now();
    }

    get value(): LocalDate {
        return this._value;
    }

    set value(value: LocalDate) {
        this._value = value;
        this.year = this.value.year();
        this.month = this.value.monthValue();
        
        this.change.emit(value);
    }

    get dateString(): string {
        let year = this.value.year();
        let month = ("0" + this.value.monthValue()).slice(-2);
        let date = ("0" + this.value.dayOfMonth()).slice(-2);
        return year + "/" + month + "/" + date;
    }

    get dayString(): string {
        return CalendarComponent.days[this.value.dayOfWeek().value() % 7] + "曜日";
    }

    get dateArray(): (LocalDate | null)[][] {
        return CalendarComponent.dateArrayOf(this.year, this.month);
    }

    setAvailableRange(startInclusive: LocalDate, endInclusive: LocalDate): void {
        this.start = startInclusive;
        this.end = endInclusive;
    }

    isSelected(dayOfMonth: LocalDate | null): boolean {
        if (dayOfMonth === null)
            return false;
        else
            return this.value.equals(dayOfMonth);
    }

    isAvailableDate(date: LocalDate | null) {
        if (date === null)
            return false;
        else
            return (this.start ? !this.start.isAfter(date) : true)
                && (this.end ? !this.end.isBefore(date) : true)
                && this.datePredicate(date);
    }

    onDateClick(date: LocalDate): void {
        if (this.isAvailableDate(date))
            this.value = date;
    }

    shiftDate(value: number): void {
        let shifted = this.value.plusDays(value);
        if (this.isAvailableDate(shifted))
            this.value = shifted;
    }

    setYearMonth(year: number, month: number): void {
        let changed = new Date(year, month - 1);
        this.year = changed.getFullYear();
        this.month = changed.getMonth() + 1;
    }

    private computeDate(dayOfMonth: number): LocalDate {
        return LocalDate.of(this.year, this.month, dayOfMonth);
    }

    static dateArrayOf(year: number, month: number): (LocalDate | null)[][] {
        let first = new Date(year, month - 1);
        let end_of_month = (() => {
            let date = new Date(year, month);
            date.setDate(0);
            return date.getDate();
        })();

        let calendar: (LocalDate | null)[][] = []
        let day_offset = first.getDay();
        for (var line = 0; line < 6; line++) {
            var head_day = (line * 7) - day_offset + 1;

            let cells: (LocalDate | null)[] = [];
            for (var day_of_week = 0; day_of_week < 7; day_of_week++) {
                var day = head_day + day_of_week;
                cells.push(day > 0 && day <= end_of_month ? LocalDate.of(year, month, day) : null)
            }
            calendar.push(cells);
        }
        return calendar;
    }
}
