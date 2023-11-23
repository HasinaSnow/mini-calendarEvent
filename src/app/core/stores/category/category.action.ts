import { ICategory } from "../../models/category.model"

export class RetrieveAllCategs {
    static readonly type: string = '[Category Page] Retrieve all Categs'
}

export class AllRetrieved {
    static readonly type: string = '[Categs Page] all Categs retrieved'
    constructor(public categs: ICategory[]) {}

}

export class AddCategory {
    static readonly type: string = '[Category Api] Add one Categ'
    constructor(categ: ICategory) {}
}

export class RetrievOneCateg {
    static readonly type: string = '[Category Page] Retrieve  one categ'
    constructor(public idEvent: number) {}
}

export class OneCategRetrieved {
    static readonly type: string = '[Category Api] One category retrieved'
    constructor(public event: ICategory) {}
}

export class CategNotRetrieved {
    static readonly type: string = '[Categ Api] Categ not retrieved'
}