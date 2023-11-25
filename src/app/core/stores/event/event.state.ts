import { Action, State, StateContext, Store } from "@ngxs/store";
import { IEvent } from "../../models/event.model";
import { Injectable, inject } from "@angular/core";
import { AddNewEvent, DeleteEvent, EditEvent, RetrievAllEvents, RetrievOneEvent } from "./event.action";
import { EventGateway } from "../../ports/event.gateway";
import { tap } from "rxjs";
import { EnableToast, NotFoundRedirection } from "../global/global.action";

export interface EventStateModel {
    allEvents: IEvent[],   
    oneEvent: IEvent|null,
}

@State<EventStateModel>({
    name: 'event',
    defaults: {
        allEvents: [],
        oneEvent: null
    }
})
@Injectable()
export class EventState {
    private eventGateway = inject(EventGateway)
    private store: Store = inject(Store)

    /************ GET ALL **************/

    @Action(RetrievAllEvents)
    retrievAllEvents(ctx: StateContext<EventStateModel>) {
        return this.eventGateway.retrieveAll().pipe(
            tap(events => {
                console.log(events)
                return this.allEventsRetrieved(ctx, events)
            })
        )
    }

    /************ GET ONE **************/

    @Action(RetrievOneEvent)
    retrieveOneEvent(ctx: StateContext<EventStateModel>, { idEvent } : RetrievOneEvent) {
        return this.eventGateway.retrieveOne(idEvent).pipe(
            tap(event => {
                if(!event)
                    return this.eventNotRetrieved(ctx)
                return this.oneEventRetrieved(ctx, event)
            })
        )
    }

    /************ ADD NEW **************/

    @Action(AddNewEvent)
    addNewEvent(ctx: StateContext<EventStateModel>, { event } : AddNewEvent) {
        return this.eventGateway.addNew(event).pipe(
            tap(event => {
                if(!event) 
                    return this.eventNotAdded()
                return this.newEventAdded(ctx, event)
            })
        )
    }

    /************ EDIT **************/

    @Action(EditEvent)
    editEvent(ctx: StateContext<EventStateModel>, { event } : EditEvent) {
        return this.eventGateway.edit(event).pipe(
            tap(events => {
                if(events) return this.eventEdited(ctx, events)
                return this.eventNotEdited()
            })
        )
    }

    /************ DELETE **************/

    @Action(DeleteEvent)
    deleteEvent(ctx: StateContext<EventStateModel>, { idEvent } : DeleteEvent) {
        return this.eventGateway.remove(idEvent).pipe(
            tap(events => {
                if(!events) 
                    return this.eventNotDeleted()
                return this.eventDeleted(ctx, events)
            })
        )
    }

    // PRIVATE METHODS //
    
    private allEventsRetrieved(ctx: StateContext<EventStateModel>, events: IEvent[]) {
        return ctx.patchState({ allEvents: events })
    }

    private oneEventRetrieved(ctx: StateContext<EventStateModel>, event:IEvent) {
        return ctx.patchState({ oneEvent: event })
    }

     private eventNotRetrieved(ctx: StateContext<EventStateModel>) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'warn', summary: 'warn', detail: 'Event not retrieved' }))
        return ctx.dispatch(new NotFoundRedirection())
    }

    private newEventAdded(ctx: StateContext<EventStateModel>, event: IEvent) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'success', summary: 'success', detail: 'New Event successfully added' }))
        const events = ctx.getState().allEvents
        console.log('events =>', events)
        const newEvents = [ ...events, event]
        console.log('new events =>', newEvents)
        return ctx.patchState({ allEvents: newEvents })
    }

    private eventNotAdded() {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'warn', summary: 'warn', detail: 'Error! There is a problem to add Event' }))
    }

    private eventEdited(ctx: StateContext<EventStateModel>, events: IEvent[]) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'success', summary: 'success', detail: 'Event successfully edited' }))
        return ctx.patchState({ allEvents: events })
    }

    private eventNotEdited() {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'warn', summary: 'warn', detail: 'Error! There is a problem to edit Event' }))
    }

    private eventDeleted(ctx: StateContext<EventStateModel>, events : IEvent[]) {
        console.log('event removed')
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'success', summary: 'success', detail: 'Event successfully removed' }))
        return ctx.patchState({ allEvents: events })
    }

    private eventNotDeleted() {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'danger', summary: 'danger', detail: 'Error! There is a problem to remove Event' }))
    }

}