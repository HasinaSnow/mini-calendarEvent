import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { DisableToast, EnableToast, NotFoundRedirection, SetTitlePage } from "./global.action";
import { Router } from "@angular/router";
import { IInfosToast } from "src/app/shared/interfaces/info-toast.interface";

export interface GlobalStateModel {
    titlePage: string,
    toastEnabled: boolean, 
    dataToast: IInfosToast
}

@State<GlobalStateModel>({
    name: 'global',
    defaults: {
        titlePage: '',
        toastEnabled: false,
        dataToast: {}
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

    @Action(EnableToast)
    enableToast(ctx: StateContext<GlobalStateModel>, { infos } : EnableToast) {
        // update data toast
        return ctx.patchState({ dataToast: infos, toastEnabled: true })
    }

    @Action(DisableToast)
    disableToast(ctx: StateContext<GlobalStateModel>) {
        // update data toast
        return ctx.patchState({ dataToast: {}, toastEnabled: false })
    }

}