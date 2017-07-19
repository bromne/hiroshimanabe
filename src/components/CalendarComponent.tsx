import * as React from "react";
import { LocalDate } from 'js-joda';
let classNames = require("classnames");

import "./calendar.component.scss";

export class CalendarComponent extends React.Component<Props, State> {
    static DAYS: string[] = ["日", "月", "火", "水", "木", "金", "土"];
    
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="datepicker">
                <section className="z-depth-2">
                    <div className="day teal darken-1 white-text">{ this.dayString }</div>
                    <div className="date teal lighten-1 white-text">{ this.dateString }</div>
                    <div className="year-and-month">
                        <div className="year middle">
                            <div className="arrow" onClick={ e => this.setYearMonth(this.state.year + 1, this.state.month) }>
                                <div>▲</div>
                            </div>
                            <div>{ this.state.year }</div>
                            <div className="arrow" onClick={ e => this.setYearMonth(this.state.year - 1, this.state.month) }>
                                <div>▼</div>
                            </div>
                        </div>
                        <div className="middle" style={ { paddingRight: "0.5em" } }>年</div>
                        <div className="month middle">
                            <div className="arrow" onClick={ e => this.setYearMonth(this.state.year, this.state.month + 1) }>
                                <div>▲</div>
                            </div>
                            <div>{ ("0" + (this.state.month)).slice(-2) }</div>
                            <div className="arrow" onClick={ e => this.setYearMonth(this.state.year, this.state.month - 1) }>
                                <div>▼</div>
                            </div>
                        </div>
                        <div className="middle">月</div>
                    </div>
                    <table className="calendar">
                        <thead>
                        <tr>
                            <td className="sunday">日</td>
                            <td>月</td>
                            <td>火</td>
                            <td>水</td>
                            <td>木</td>
                            <td>金</td>
                            <td className="saturday">土</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.dateArray.map((week, i) => (
                                <tr key={ i }>
                                    {
                                        week.map((date, i) => (
                                            <td
                                                key={ i }
                                                className={ classNames({
                                                    "selectable": this.isAvailableDate(date),
                                                    "selected": this.isSelected(date),
                                                }) }
                                                onClick={ e => this.onDateClick(date) }>{ date ? date.dayOfMonth() : <span>&nbsp;</span> }</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </section>
                <div className="buttons">
                    <button className={ classNames("waves-effect waves-light btn-large", { "disabled": !this.isAvailableDate(this.value.plusDays(-1)) })}
                        style={ { float: "left" } }
                        onClick={ e => this.shiftDate(-1) }>前の日</button>
                    <button className={ classNames("waves-effect waves-light btn-large", { "disabled": !this.isAvailableDate(this.value.plusDays(1)) })}
                        style={ { float: "right" } }
                        onClick={ e => this.shiftDate(1) }>次の日</button>
                </div>
            </div>
        );
    }

    componentWillMount(): void {
        this.setStateByValue(this.props.initialValue);
    }

    get value(): LocalDate {
        return this.state.value;
    }

    set value(value: LocalDate) {
        this.setStateByValue(value);
        this.props.onChange(value);
    }

    private setStateByValue(value: LocalDate) {
        this.setState((state: State) => {
            state.value = value;
            state.year = value.year();
            state.month = value.monthValue();
        });
    }

    setYearMonth(year: number, month: number): void {
        let changed = new Date(year, month - 1);
        this.setState(state => {
            state.year = changed.getFullYear();
            state.month = changed.getMonth() + 1;
        });
    }

    get dateString(): string {
        let year = this.value.year();
        let month = ("0" + this.value.monthValue()).slice(-2);
        let date = ("0" + this.value.dayOfMonth()).slice(-2);
        return year + "/" + month + "/" + date;
    }

    get dayString(): string {
        return CalendarComponent.DAYS[this.value.dayOfWeek().value() % 7] + "曜日";
    }

    get dateArray(): (LocalDate | null)[][] {
        return CalendarComponent.dateArrayOf(this.state.year, this.state.month);
    }

    isSelected(dayOfMonth: LocalDate | null): boolean {
        if (dayOfMonth === null)
            return false;
        else
            return this.value.equals(dayOfMonth);
    }

    isAvailableDate(date: LocalDate | null): boolean {
        if (date === null)
            return false;
        else {
            return (this.props.start ? !this.props.start.isAfter(date) : true)
                && (this.props.end ? !this.props.end.isBefore(date) : true)
                && (this.props.datePredicate ? this.props.datePredicate(date) : true);
        }
    }

    onDateClick(date: LocalDate | null): void {
        if (date !== null && this.isAvailableDate(date))
            this.value = date;
    }

    shiftDate(value: number): void {
        let shifted = this.value.plusDays(value);
        if (this.isAvailableDate(shifted))
            this.value = shifted;
    }

    private computeDate(dayOfMonth: number): LocalDate {
        return LocalDate.of(this.state.year, this.state.month, dayOfMonth);
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

class Props {
    initialValue: LocalDate;

    onChange: (value: LocalDate) => void;
    datePredicate?: (date: LocalDate) => boolean = (e) => true;

    start?: LocalDate;
    end?: LocalDate;
}

class State {
    value: LocalDate;

    year: number;
    month: number;
}
