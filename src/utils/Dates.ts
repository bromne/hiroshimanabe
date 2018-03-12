import { LocalDate } from 'js-joda/dist/js-joda';

export class Dates {
    public static from(value: string): LocalDate {
        const get = (from: number, length: number) => Number.parseInt(value.substr(from, length));

        const year = get(0, 4);
        const month = get(5, 2);
        const day = get(8, 2);
        return LocalDate.of(year, month, day);
    }

    public static format(value: LocalDate): string {
        const year = value.year();
        const month = ('0' + value.monthValue()).slice(-2);
        const date = ('0' + value.dayOfMonth()).slice(-2);
        return year + '-' + month + '-' + date;
    }
}
