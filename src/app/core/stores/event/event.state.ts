import { Action, State, StateContext, Store } from "@ngxs/store";
import { IEvent } from "../../models/event.model";
import { Injectable, inject } from "@angular/core";
import { AddNewEvent, DeleteEvent, EditEvent, RetrievAllEvents, RetrievOneEvent } from "./event.action";
import { EventGateway } from "../../ports/event.gateway";
import { tap } from "rxjs";
import { EnableToast, NotFoundRedirection } from "../global/global.action";
import { ToastService } from "src/app/shared/services/toast.service";
import { MSG_TOAST_EVENT_ADDED, MSG_TOAST_EVENT_EDITED, MSG_TOAST_EVENT_NOT_ADDED, MSG_TOAST_EVENT_NOT_EDITED, MSG_TOAST_EVENT_NOT_REMOVED, MSG_TOAST_EVENT_NOT_RETRIVED, MSG_TOAST_EVENT_REMOVED } from "src/app/shared/values/msg-toast.values";

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
    // private store: Store = inject(Store)
    private toastService = inject(ToastService)

    /************ GET ALL **************/

    @Action(RetrievAllEvents)
    retrievAllEvents(ctx: StateContext<EventStateModel>) {
        return this.eventGateway.retrieveAll().pipe(
            tap(events => {
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
        this.toastService.infoMsg(MSG_TOAST_EVENT_NOT_RETRIVED)
        return ctx.dispatch(new NotFoundRedirection())
    }

    private newEventAdded(ctx: StateContext<EventStateModel>, event: IEvent) {
        this.toastService.successMsg(MSG_TOAST_EVENT_ADDED)
        const events = ctx.getState().allEvents
        const newEvents = [ ...events, event]
        return ctx.patchState({ allEvents: newEvents })
    }

    private eventNotAdded() {
        this.toastService.successMsg(MSG_TOAST_EVENT_NOT_ADDED)
    }

    private eventEdited(ctx: StateContext<EventStateModel>, events: IEvent[]) {
        this.toastService.successMsg(MSG_TOAST_EVENT_EDITED)
        return ctx.patchState({ allEvents: events })
    }

    private eventNotEdited() {
        this.toastService.warnMsg(MSG_TOAST_EVENT_NOT_EDITED)

    }

    private eventDeleted(ctx: StateContext<EventStateModel>, events : IEvent[]) {
        this.toastService.successMsg(MSG_TOAST_EVENT_REMOVED)
        return ctx.patchState({ allEvents: events })
    }

    private eventNotDeleted() {
        this.toastService.warnMsg(MSG_TOAST_EVENT_NOT_REMOVED)
    }

}