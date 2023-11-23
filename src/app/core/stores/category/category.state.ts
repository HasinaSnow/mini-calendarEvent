import { Injectable, inject } from "@angular/core";
import { ICategory } from "../../models/category.model";
import { Action, State, StateContext } from "@ngxs/store";
import { AllRetrieved, RetrieveAllCategs } from "./category.action";
import { tap } from "rxjs";
import { CategGateway } from "../../ports/categ.gateway";

export interface CategoryStateModel {
    categories: ICategory[],
}

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        categories: [],
    }
})
@Injectable()
export class CategoryState {
    private categGateway = inject(CategGateway)

    @Action(RetrieveAllCategs)
    retrievAllEvents(ctx: StateContext<CategoryStateModel>) {
        return this.categGateway.retrieveAll().pipe(
            tap(categs => {
                console.log(categs)
                return ctx.dispatch(new AllRetrieved(categs))})
        )
    }

    @Action(AllRetrieved)
    allCategsRetrieved(ctx: StateContext<CategoryStateModel>, { categs }: AllRetrieved) {
        // update the state
        return ctx.patchState({ categories: categs })
    }
}