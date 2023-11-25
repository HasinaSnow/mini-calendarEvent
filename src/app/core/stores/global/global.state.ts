import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AcceptDialogConfirmation, CloseDialogConfirmation, DisableToast, EnableToast, NotFoundRedirection, OpenDialogConfirmation, RejectDialogConfirmation, SetTitlePage } from "./global.action";
import { Router } from "@angular/router";
import { IInfosToast } from "src/app/shared/interfaces/info-toast.interface";
import { IDataDialogConfirm } from "src/app/shared/interfaces/data-dialog-confirm.interface";

export interface GlobalStateModel {
    titlePage: string,
    toastEnabled: boolean, 
    dataToast: IInfosToast,
    dialogConfirmationOpened: boolean,
    dataDialogConfirmation: IDataDialogConfirm,
    dialogConfirmationAccepted: boolean
}

@State<GlobalStateModel>({
    name: 'global',
    defaults: {
        titlePage: '',
        toastEnabled: false,
        dataToast: {},
        dialogConfirmationOpened: false,
        dataDialogConfirmation: {},
        dialogConfirmationAccepted: false
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

    @Action(OpenDialogConfirmation)
    openDialogConfirmation(ctx: StateContext<GlobalStateModel>, { dataDialog } : OpenDialogConfirmation) {
        return ctx.patchState({dataDialogConfirmation: dataDialog, dialogConfirmationOpened: true })
    }

    @Action(CloseDialogConfirmation)
    closeDialogConfirmation(ctx: StateContext<GlobalStateModel>) {
        return ctx.patchState({ dataDialogConfirmation: {}, dialogConfirmationOpened: false })
    }

    @Action(AcceptDialogConfirmation)
    acceptDialogConfirmation(ctx: StateContext<GlobalStateModel>) {
        console.log('dialog accepted')
        return ctx.patchState({ dialogConfirmationAccepted: true })
    }

    @Action(RejectDialogConfirmation)
    rejectDialogConfirmation(ctx: StateContext<GlobalStateModel>) {
        return ctx.patchState({ dialogConfirmationAccepted: false })
    }


}