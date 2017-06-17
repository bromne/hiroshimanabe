import { Component, Input } from '@angular/core';
import { DateTime } from "typescript-dotnet-commonjs/System/Time/DateTime";

@Component({
    selector: 'calendar-control',
    templateUrl: './calendar.component.html',
    styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
    days: string[] = ["日", "月", "火", "水", "木", "金", "土"];

    dateTime: DateTime;

    constructor() {
        this.dateTime = new DateTime(new Date());
    }

    get dateString(): string {
        let year = ("0" + this.dateTime.year).slice(-4);
        let month = ("0" + (this.dateTime.month + 1)).slice(-2);
        let date = ("0" + this.dateTime.day).slice(-2);
        return year + "/" + month + "/" + date;
    }

    get dayString(): string {
        return this.days[this.dateTime.dayOfWeek] + "曜日";
    }

    get dateArray(): (number | null)[][] {
        return CalendarComponent.dateArrayOf(this.dateTime.year, this.dateTime.month + 1);
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
        for (var line = 0; true; line++) {
            var head_date = (line * 7) - day_offset + 1;
            if (head_date <= end_of_month) {
                let cells: (number | null)[] = [];
                for (var day_of_week = 0; day_of_week < 7; day_of_week++) {
                    var date = head_date + day_of_week;
                    cells.push(date > 0 && date <= end_of_month ? date : null)
                }
                calendar.push(cells);
            } else {
                return calendar;
            }
        }
    }
}
