import { ICategory } from "../../models/category.model"

export class RetrieveAllCategs {
    static readonly type: string = '[Category Page] Retrieve all Categs'
}

export class AllRetrieved {
    static readonly type: string = '[Categs Page] all Categs retrieved'
    constructor(public categs: ICategory[]) {}

}

export class RetrievOneCateg {
    static readonly type: string = '[Category Page] Retrieve  one categ'
    constructor(public idCateg: number) {}
}

export class AddCategory {
    static readonly type: string = '[Category Api] Add one Categ'
    constructor(public categ: ICategory) {}
}

export class EditCategory {
    static readonly type: string = '[Category Api] Edit Categ'
    constructor(public categ: ICategory) {}
}

export class DeleteCategory {
    static readonly type: string = '[Category Api] Delete Categ'
    constructor(public idCateg: number) {}
}


