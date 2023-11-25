import { IDataDialogConfirm } from "src/app/shared/interfaces/data-dialog-confirm.interface"
import { IInfosToast } from "src/app/shared/interfaces/info-toast.interface"

export class SetTitlePage {
    static readonly type: string = '[All Page] Get title of current page'
    constructor(public title: string) {}
}

export class GetTitlePage {
    static readonly type: string = '[All Page] Get the title of current page'
    constructor(public title: string) {}
}

export class NotFoundRedirection {
    static readonly type: string = '[NotFound Page] page not found'
}

export class EnableToast {
    static readonly type: string = '[All Page] enable toast'
    constructor(public infos: IInfosToast) {}
}

export class DisableToast {
    static readonly type: string = '[All Page] disable toast'
}

export class AcceptDialogConfirmation {
    static readonly type: string = '[All Page] accept didalog confirmation'
}

export class RejectDialogConfirmation {
    static readonly type: string = '[All Page] reject didalog confirmation'
}

export class OpenDialogConfirmation {
    static readonly type: string = '[All Page] open didalog confirmation'
    constructor(public dataDialog: IDataDialogConfirm) {}
}

export class CloseDialogConfirmation {
    static readonly type: string = '[All Page] close didalog confirmation'
    constructor() {}
}