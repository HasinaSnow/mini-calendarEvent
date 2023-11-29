import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategInitial, ICategory } from 'src/app/core/models/category.model';
import { EditCategory, RetrievOneCateg } from 'src/app/core/stores/category/category.action';
import { CategFormComponent } from '../../components/categ-form/categ-form.component';
import { CATEG_ROUTE } from 'src/app/shared/values/default-routes.values';

@Component({
  selector: 'app-categ-edit',
  standalone: true,
  imports: [CommonModule, CategFormComponent],
  templateUrl: './categ-edit.component.html',
  styleUrls: ['./categ-edit.component.scss']
})
export class CategEditComponent implements OnInit {
  private store: Store = inject(Store)
  private route: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)

  initialValues: ICategInitial

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new RetrievOneCateg(id))
    })
    this.store.select(store => store.category.oneCateg).subscribe(categ => this.initialValues = categ)
  }

  onSubmit(categ: ICategory) {
    this.store.dispatch(new EditCategory(categ))
    this.router.navigate([CATEG_ROUTE.path])
  }

  onReset() {
    console.log('form reset')
  }

}
