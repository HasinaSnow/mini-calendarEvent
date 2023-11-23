import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { NotFoundRedirection, SetTitlePage } from "./global.action";
import { Router } from "@angular/router";

export interface GlobalStateModel {
    titlePage: string,
}

@State<GlobalStateModel>({
    name: 'global',
    defaults: {
        titlePage: ''
    }
})
@Injectable()
export class GlobalState {
    private router = inject(Router)

    @Action(SetTitlePage)
    setTitlePage(ctx: StateContext<GlobalStateModel>, { title } : SetTitlePage) {
        return ctx.patchState({ titlePage: title})
    }

    @Action(NotFoundRedirection)
    notFoundRedirection(ctx: StateContext<GlobalStateModel>) {
        console.log('event not found')
        return this.router.navigate(['/**'])
    }

}