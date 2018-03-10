import { LocalDate } from 'js-joda';

export default class RequestProfile {
    constructor(public userName: string, public date: LocalDate) {
    }
}
