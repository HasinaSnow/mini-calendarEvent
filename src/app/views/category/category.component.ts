import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ICategory } from 'src/app/core/models/category.model';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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

  onCreate() {
    this.router.navigate(['/category/new'])
  }

  onEdit(idCateg: number) {
    this.router.navigate(['/category/edit', idCateg])
  }
  
  onDelete(cateId: number) {
    // this.store.dispatch(new DeleteCategory(categId))
  }
}
