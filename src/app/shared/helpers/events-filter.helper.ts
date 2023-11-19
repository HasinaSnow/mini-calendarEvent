import { IEvent } from "src/app/core/models/event.model";

export class EventsFilter {
    constructor(private events: IEvent[]) {}

    byYear(year: number): EventsFilter {
        this.events = this.events.filter(event => {
            const y: number = new Date(event.date).getFullYear()
            return y === year})
        return this
    }

    byMonth(month: number): EventsFilter {
        this.events = this.events.filter(event => {
            const m: number = new Date(event.date).getMonth()
            return m === month
        })
        return this
    }

    byDate(date: number): EventsFilter {
        this.events = this.events.filter(event => {
            const d: number = new Date(event.date).getDate()
            return d === date
        })
        return this
    }

    buildFilter(): IEvent[] {
        return this.events
    }
}