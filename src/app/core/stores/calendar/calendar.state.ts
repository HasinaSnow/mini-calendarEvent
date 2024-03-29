import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import {  IEventCalendar } from "../../models/event.model";
import { DateToSelected, MonthToDecremented, MonthToIncremented, MonthToSelected, ResetonToday, YearToDecremented, YearToIncremented, YearToSelected } from "./calendar.action";

export interface CalendarStateModel {
    EventsCalendarMonth: IEventCalendar[],
    fullDateSelected: Date,
    yearSelected: number,
    monthSelected: number,
    dateSelected: number,
    dayselected: number
}

@State<CalendarStateModel>({
    name: 'calendar',
    defaults: {
        EventsCalendarMonth: [],
        fullDateSelected: new Date(),
        yearSelected: new Date().getFullYear(),
        monthSelected: new Date().getMonth(),
        dateSelected: new Date().getDate(),
        dayselected: new Date().getDay()
    }
})
@Injectable()
export class CalendarState {

    @Action(ResetonToday)
    resetOnToday(ctx: StateContext<CalendarStateModel>) {
        // update the states of daySelected, dateSelected, monthSelected, yearSelected
        return ctx.patchState({
            dayselected: new Date().getDay(),
            dateSelected: new Date().getDate(),
            monthSelected: new Date().getMonth(),
            yearSelected: new Date().getFullYear()
        })
    }

    @Action(MonthToIncremented)
    monthToIncremented(ctx: StateContext<CalendarStateModel>) {
        let monthSelected = ctx.getState().monthSelected
        if(monthSelected === 11) {
            const yearSelected = ctx.getState().yearSelected
            monthSelected = -1
            return ctx.patchState({yearSelected: yearSelected + 1, monthSelected: monthSelected + 1})
        }
        return ctx.patchState({ monthSelected: monthSelected + 1 })
    }

    @Action(MonthToDecremented)
    monthToDecremented(ctx: StateContext<CalendarStateModel>) {
        // get the state of monthSelected
        let monthSelected = ctx.getState().monthSelected
        if(monthSelected === 0) {
            const yearSelected = ctx.getState().yearSelected
            monthSelected = 12
            return ctx.patchState({yearSelected: yearSelected -1, monthSelected: monthSelected - 1})
        }
        // update the state of monthSelected
        return ctx.patchState({ monthSelected: monthSelected - 1 })
    }

    @Action(YearToIncremented)
    yearToIncremented(ctx: StateContext<CalendarStateModel>) {
        const yearSelected = ctx.getState().yearSelected
        return ctx.patchState({ yearSelected: yearSelected + 1 })
    }

    @Action(YearToDecremented)
    yearToDecremented(ctx: StateContext<CalendarStateModel>) {
        const yearSelected = ctx.getState().yearSelected
        return ctx.patchState({ yearSelected: yearSelected - 1 })
    }

    @Action(MonthToSelected)
    monthToSelected(ctx: StateContext<CalendarStateModel>, { month } : MonthToSelected) {
        //  update the state
        return ctx.patchState({ monthSelected: month })
    }

    @Action(YearToSelected)
    yearToSelected(ctx: StateContext<CalendarStateModel>, { year } : YearToSelected) {
        // update the state of yearSelected
        return ctx.patchState({ yearSelected: year })
    }

    @Action(DateToSelected)
    dateToSelected(ctx: StateContext<CalendarStateModel>, { date } : DateToSelected) {
        // update the state of dateSelected
        const monthSelected: number = ctx.getState().monthSelected
        const yearSelected: number = ctx.getState().yearSelected
        return ctx.patchState({ dateSelected: date, fullDateSelected: new Date(yearSelected, monthSelected, date)})
    }

}