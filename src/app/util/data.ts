import { LocalDate } from "js-joda/dist/js-joda";

export class Dates {
    static from(value: string): LocalDate {
        let get = (from: number, length: number) => Number.parseInt(value.substr(from, length));

        let year = get(0, 4);
        let month = get(5, 2);
        let day = get(8, 2);
        return LocalDate.of(year, month, day);
    }
    
    static format(value: LocalDate): string {
        let year = value.year();
        let month = ("0" + value.monthValue()).slice(-2);
        let date = ("0" + value.dayOfMonth()).slice(-2);
        return year + "-" + month + "-" + date;
    }
}
