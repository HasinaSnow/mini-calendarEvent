import { Component, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ICategory } from 'src/app/core/models/category.model';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { OpenDialogConfirmation, RejectDialogConfirmation } from 'src/app/core/stores/global/global.action';
import { DATA_DIALOG_CONFIRM_DELETE_CATEG } from 'src/app/shared/values/default-global.values';
import { DeleteCategory } from 'src/app/core/stores/category/category.action';
import { CATAEG_NEW_ROUTE, CATEG_EDIT_ROUTE, CATEG_ROUTE } from 'src/app/shared/values/default-routes.values';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, DividerModule, AccordionModule, ButtonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  private router = inject(Router)

  private store = inject(Store)
  isVisibleFormDialog: boolean = false
  categList: Signal<ICategory[]> = toSignal(this.store.select(store => store.category.allCategs), { initialValue: [] as ICategory[]})
  cateIdClicked: number

  // manage dialog confirmation
  dialogConfirmationAccepted: Signal<boolean> = toSignal(this.store.select(store => store.global.dialogConfirmationAccepted))
  AcceptDialogConfirmEffect = effect(() => {
    console.log('dialog confirm accepted change: ', this.dialogConfirmationAccepted());
    this.manageDialogConfirm()
  }, { allowSignalWrites: true });

  onCreate() {
    this.router.navigate([CATEG_ROUTE.path + '/' + CATAEG_NEW_ROUTE.path])
  }

  onEdit(idCateg: number) {
    this.cateIdClicked = idCateg
    this.router.navigate([CATEG_ROUTE.path + '/' + CATEG_EDIT_ROUTE.path, idCateg])
  }

  onDelete(categId: number) {
    // this.store.dispatch(new DeleteCategory(categId))
    this.cateIdClicked = categId
    this.store.dispatch(new OpenDialogConfirmation(DATA_DIALOG_CONFIRM_DELETE_CATEG))
  }

  manageDialogConfirm() {
    if(this.dialogConfirmationAccepted()) {
      console.log('delete Event')
      this.store.dispatch(new DeleteCategory(this.cateIdClicked)) // call action
      this.store.dispatch(new RejectDialogConfirmation()) // disable
    }
  }
}
