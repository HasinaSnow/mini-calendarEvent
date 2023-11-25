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