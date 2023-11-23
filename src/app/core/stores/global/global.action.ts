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