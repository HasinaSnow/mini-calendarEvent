import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Observable, map, of, take } from "rxjs";
import { ICategory } from "src/app/core/models/category.model";
import { RetrieveAllCategs } from "src/app/core/stores/category/category.action";

@Injectable({
    providedIn: 'root'
})
export class AsyncValidatorsService {
    private store = inject(Store)

    isNameCategAlreadyExist(id: number): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors|null> => {
          if(!control.value) return of(null)
          const name = control.value
          this.store.dispatch(new RetrieveAllCategs())
          return this.store.select(store => store.category.allCategs).pipe(
            take(1),
            map((categs: ICategory[]) => {
              // enlever la categ à editer s'il s'agit d'une edition
              const categsTarget: ICategory[] = categs.filter(categ => categ.id != id)
              const lowerStringCategNames = categsTarget.map(categ => categ.name.toLowerCase())
              return !lowerStringCategNames.includes(name.toLowerCase()) ? null : { isNameExist: true }
            })
          )
        }
      }
}