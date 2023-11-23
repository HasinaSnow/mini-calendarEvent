import { PropertySelectors, createPropertySelectors, createSelector } from "@ngxs/store";
import { CalendarState, CalendarStateModel } from "./calendar.state";
import { IEvent } from "../../models/event.model";
import { EventsFilter } from "src/app/shared/helpers/events-filter.helper";
import { EventState, EventStateModel } from "../event/event.state";

export class CalendarSelectors {

    // all property values of CalendarState
    static calendarSlices: PropertySelectors<CalendarStateModel> = createPropertySelectors<CalendarStateModel>(CalendarState)
    static eventSlices: PropertySelectors<EventStateModel> = createPropertySelectors<EventStateModel>(EventState)

    static getEventsMonthCalendar() {
        return createSelector(
            [
                CalendarSelectors.eventSlices.allEvents,
                CalendarSelectors.calendarSlices.monthSelected,
                CalendarSelectors.calendarSlices.yearSelected
            ],
            (events, month, year) => {
                const e: IEvent[] = new EventsFilter(events).byYear(year).byMonth(month).buildFilter()
                return e.map(event => ({ id: event.id, date: event.date, color: event.category.color }))
            }
        )
    }
    
    static getEventSelectedCard() {
        return createSelector(
            [
                CalendarSelectors.eventSlices.allEvents,
                CalendarSelectors.calendarSlices.dateSelected,
                CalendarSelectors.calendarSlices.monthSelected,
                CalendarSelectors.calendarSlices.yearSelected
            ],
            (events, date, month, year) => {
                const e: IEvent[] = new EventsFilter(events).byDate(date).byMonth(month).byYear(year).buildFilter()
                return e.map(event => ({ 
                    id: event.id,
                    date: event.date,
                    category: event.category,
                    place: event.place,
                    customer: event.customer,
                    confirm: event.confirm,
                    type: event.type
                }))
            }
        )
    }

    static getEventById(id: number) {
        return createSelector(
            [CalendarSelectors.eventSlices.allEvents], 
            (events) => events.find(event => event.id == id)
        )
    }

    static getEventsCardSelected() {
        return createSelector(
            [
                CalendarSelectors.eventSlices.allEvents,
                CalendarSelectors.calendarSlices.fullDateSelected
            ],
            (events, fullDateSelected) => {
                const e: IEvent[] = new EventsFilter(events).byDate(fullDateSelected.getDate()).byMonth(fullDateSelected.getMonth()).byYear(fullDateSelected.getFullYear()).buildFilter()
                return e.map(event => ({ 
                    id: event.id,
                    date: event.date,
                    category: event.category,
                    place: event.place,
                    customer: event.customer,
                    confirm: event.confirm,
                    type: event.type
                }))
            }
        )
    }
}