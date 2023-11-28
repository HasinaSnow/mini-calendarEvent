import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategFormComponent } from '../../components/categ-form/categ-form.component';
import { ICategInitial, ICategory } from 'src/app/core/models/category.model';
import { Store } from '@ngxs/store';
import { INITIAL_CATEG_VALUE } from 'src/app/shared/values/initial-categ.values';
import { AddCategory } from 'src/app/core/stores/category/category.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categ-new',
  standalone: true,
  imports: [CommonModule, CategFormComponent],
  templateUrl: './categ-new.component.html',
  styleUrls: ['./categ-new.component.scss']
})
export class CategNewComponent implements OnInit {

  private router = inject(Router)
  private store = inject(Store)
  initialValues: ICategInitial

  ngOnInit(): void {
    this.initialValues = INITIAL_CATEG_VALUE
  }

  onSubmit(categ: ICategory) {
    console.log('form valid')
    this.store.dispatch(new AddCategory(categ))
    this.router.navigate(['/category'])
  }

  onReset() {
    console.log('on reset')
  }

}
