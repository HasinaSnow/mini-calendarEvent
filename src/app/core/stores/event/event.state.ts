import { Action, State, StateContext } from "@ngxs/store";
import { IEvent } from "../../models/event.model";
import { Injectable, inject } from "@angular/core";
import { EventNotRetrieved, NotFoundRedirection, OneEventRetrieved, RetrievOneEvent } from "./event.action";
import { EventGateway } from "../../ports/event.gateway";
import { tap } from "rxjs";
import { Router } from "@angular/router";

export interface EventStateModel {
    onEvent: IEvent|null,
}

@State<EventStateModel>({
    name: 'event',
    defaults: {
        onEvent: null
    }
})
@Injectable()
export class EventState {
    private eventGateway = inject(EventGateway)
    private router = inject(Router)

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

    @Action(NotFoundRedirection)
    notFoundRedirection(ctx: StateContext<EventStateModel>) {
        console.log('event not found')
        return this.router.navigate(['/**'])
    }
}