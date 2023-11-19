import { PropertySelectors, createPropertySelectors, createSelector } from "@ngxs/store"
import { EventState, EventStateModel } from "./event.state"

export class EventSelectors {
    static slices: PropertySelectors<EventStateModel> = createPropertySelectors<EventStateModel>(EventState)
}