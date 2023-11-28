import { Injectable, inject } from "@angular/core";
import { ICategory } from "../../models/category.model";
import { Action, State, StateContext } from "@ngxs/store";
import { AddCategory, AllRetrieved, DeleteCategory, EditCategory, RetrievOneCateg, RetrieveAllCategs } from "./category.action";
import { tap } from "rxjs";
import { CategGateway } from "../../ports/categ.gateway";
import { ToastService } from "src/app/shared/services/toast.service";
import { MSG_TOAST_CATEG_ADDED, MSG_TOAST_CATEG_EDITED, MSG_TOAST_CATEG_NOT_ADDED, MSG_TOAST_CATEG_NOT_EDITED, MSG_TOAST_CATEG_NOT_REMOVED, MSG_TOAST_CATEG_NOT_RETRIVED, MSG_TOAST_CATEG_REMOVED } from "src/app/shared/values/msg-toast.values";
import { NotFoundRedirection } from "../global/global.action";

export interface CategoryStateModel {
    allCategs: ICategory[],
    oneCateg: ICategory|null
}

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        allCategs: [],
        oneCateg: null
    }
})
@Injectable()
export class CategoryState {
    private categGateway = inject(CategGateway)
    private toastService = inject(ToastService)

    /************ GET ALL **************/

    @Action(RetrieveAllCategs)
    retrievAllCategs(ctx: StateContext<CategoryStateModel>) {
        return this.categGateway.retrieveAll().pipe(
            tap(categs => {
                return ctx.dispatch(new AllRetrieved(categs))})
        )
    }

    @Action(AllRetrieved)
    allCategsRetrieved(ctx: StateContext<CategoryStateModel>, { categs }: AllRetrieved) {
        // update the state
        return ctx.patchState({ allCategs: categs })
    }

    /************ GET ONE **************/
    @Action(RetrievOneCateg)
    retrieveOneCateg(ctx: StateContext<CategoryStateModel>, { idCateg }: RetrievOneCateg) {
        return this.categGateway.retrieveOne(idCateg).pipe(
            tap(categ => {
                if(!categ)
                    return this.categNotRetrieved(ctx)
                return this.oneCategRetrieved(ctx, categ)
            })
        )
    }

    /************ ADD NEW **************/

    @Action(AddCategory)
    addCAtegory(ctx: StateContext<CategoryStateModel>, { categ } : AddCategory) {
        return this.categGateway.addNew(categ).pipe(
            tap(event => {
                if(!categ) return this.categoryNotAdded()
                return this.categoryAdded()
            })
        )
    }

    /************ EDIT **************/

    @Action(EditCategory)
    editCategory(ctx: StateContext<CategoryStateModel>, { categ } : EditCategory) {
        return this.categGateway.edit(categ).pipe(
            tap(categs => {
                if(!categs) return this.categoryNotEdited()
                return this.categoryEdited(ctx, categs)
            })
        )
    }

    /************ DELETE **************/

    @Action(DeleteCategory)
    deleteEvent(ctx: StateContext<CategoryStateModel>, { idCateg } : DeleteCategory) {
        return this.categGateway.remove(idCateg).pipe(
            tap(categs => {
                if(!categs) 
                    return this.categoryNotDeleted()
                return this.categoryDeleted(ctx, categs)
            })
        )
    }

    // PRIVATE METHODS

    private categNotRetrieved(ctx: StateContext<CategoryStateModel>) {
        this.toastService.warnMsg(MSG_TOAST_CATEG_NOT_RETRIVED)
        return ctx.dispatch(new NotFoundRedirection())
    }

    private oneCategRetrieved(ctx: StateContext<CategoryStateModel>, categ: ICategory) {
        return ctx.patchState({ oneCateg: categ })
    }

    private categoryAdded(): void {
        this.toastService.successMsg(MSG_TOAST_CATEG_ADDED)
    }

    private categoryNotAdded(): void {
        this.toastService.warnMsg(MSG_TOAST_CATEG_NOT_ADDED)
    }

    private categoryEdited(ctx: StateContext<CategoryStateModel>, categs: ICategory[]) {
        console.log('categ edited')
        this.toastService.successMsg(MSG_TOAST_CATEG_EDITED)
        return ctx.patchState({ allCategs: categs })
    }

    private categoryNotEdited() {
        this.toastService.warnMsg(MSG_TOAST_CATEG_NOT_EDITED)
    }

    private categoryDeleted(ctx: StateContext<CategoryStateModel>, categs: ICategory[]) {
        this.toastService.successMsg(MSG_TOAST_CATEG_REMOVED)
        return ctx.patchState({ allCategs: categs })
    }

    private categoryNotDeleted() {
        this.toastService.warnMsg(MSG_TOAST_CATEG_NOT_REMOVED)
    }
}