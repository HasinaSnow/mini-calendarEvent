import { Action, State, StateContext } from "@ngxs/store";
import { IEvent } from "../../models/event.model";
import { Injectable, inject } from "@angular/core";
import { AddNewEvent, EventNotAdded, EventNotRetrieved, EventsRetrieved, NewEventAdded, OneEventRetrieved, RetrievAllEvents, RetrievOneEvent } from "./event.action";
import { EventGateway } from "../../ports/event.gateway";
import { tap } from "rxjs";
import { NotFoundRedirection } from "../global/global.action";

export interface EventStateModel {
    allEvents: IEvent[],    onEvent: IEvent|null,
}

@State<EventStateModel>({
    name: 'event',
    defaults: {
        allEvents: [],
        onEvent: null
    }
})
@Injectable()
export class EventState {
    private eventGateway = inject(EventGateway)

    @Action(RetrievAllEvents)
    retrievAllEvents(ctx: StateContext<EventStateModel>) {
        return this.eventGateway.retrieveAll().pipe(
            tap(events => {
                console.log(events)
                return ctx.dispatch(new EventsRetrieved(events))})
        )
    }

    @Action(EventsRetrieved)
    allEventsRetrieved(ctx: StateContext<EventStateModel>, { events }: EventsRetrieved) {
        // update the state
        return ctx.patchState({ allEvents: events })
    }

    @Action(RetrievOneEvent)
    retrieveOneEvent(ctx: StateContext<EventStateModel>, { idEvent } : RetrievOneEvent) {
        return this.eventGateway.retrieveOne(idEvent).pipe(
            tap(event => {
                if(event)
                    return ctx.dispatch(new OneEventRetrieved(event))
                return ctx.dispatch(new EventNotRetrieved())
            })
        )
    }

    @Action(OneEventRetrieved)
    oneEventRetrieved(ctx: StateContext<EventStateModel>, { event } : OneEventRetrieved) {
        return ctx.patchState({ onEvent: event })
    }

    @Action(EventNotRetrieved)
    eventNotRetrieved(ctx: StateContext<EventStateModel>) {
        return ctx.dispatch(new NotFoundRedirection())
    }

    @Action(AddNewEvent)
    addNewEvent(ctx: StateContext<EventStateModel>, { event } : AddNewEvent) {
        this.eventGateway.addNew(event).pipe(
            tap(event => {
                if(event) return ctx.dispatch(new NewEventAdded(event))
                return ctx.dispatch(new EventNotAdded())
            })
        )
    }

    @Action(NewEventAdded)
    newEventAdded(ctx: StateContext<EventStateModel>, { event } : NewEventAdded) {
        const events = ctx.getState().allEvents
        const newEvents = [ ...events, event]
        console.log('new event added', newEvents)
        ctx.patchState({ allEvents: newEvents })
    }

    @Action(EventNotAdded)
    eventNotAdded() {
        console.log('event not added')
    }
}