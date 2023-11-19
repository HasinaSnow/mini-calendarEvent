import { PropertySelectors, createPropertySelectors, createSelector } from "@ngxs/store";
import { CalendarState, CalendarStateModel } from "./calendar.state";
import { IEvent } from "../../models/event.model";
import { EventsFilter } from "src/app/shared/helpers/events-filter.helper";

export class CalendarSelectors {

    // all property values of CalendarState
    static slices: PropertySelectors<CalendarStateModel> = createPropertySelectors<CalendarStateModel>(CalendarState)

    static getEventsMonthCalendar() {
        return createSelector(
            [
                CalendarSelectors.slices.events, 
                CalendarSelectors.slices.monthSelected,
                CalendarSelectors.slices.yearSelected
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
                CalendarSelectors.slices.events,
                CalendarSelectors.slices.dateSelected,
                CalendarSelectors.slices.monthSelected,
                CalendarSelectors.slices.yearSelected
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
            [CalendarSelectors.slices.events], 
            (events) => events.find(event => event.id == id)
        )
    }

    static getEventsCardSelected() {
        return createSelector(
            [
                CalendarSelectors.slices.events,
                CalendarSelectors.slices.fullDateSelected
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