import { Observable, of } from "rxjs";
import { ICategory } from "../models/category.model";
import { CategGateway } from "../ports/categ.gateway";

export class InMemoryCategGateway extends CategGateway {
    private categs: ICategory[] = []

    withCategs(categs: ICategory[]) : InMemoryCategGateway {
        this.categs = categs
        return this
    }

    // get all the event list
    retrieveAll(): Observable<ICategory[]> {
        return of(this.categs)
    }

    // get one event by id
    retrieveOne(id: number): Observable<ICategory| null> {
        const categ: ICategory|undefined = this.categs.find(categ => categ.id == id)
        return of(categ == undefined ? null : categ)
      }

    override addNew(categ: ICategory): Observable<ICategory> {
        const lastCateg = this.categs.pop()
        if(lastCateg) {
            this.categs = [ ...this.categs, lastCateg ]
            categ.id = lastCateg.id + 1
        } else
            categ.id = 1

        const NewCategs: ICategory[] = [ ...this.categs, categ ]
        this.categs = NewCategs
        return of(categ)
    }

    override edit(updatedCateg: ICategory): Observable<ICategory[] | null> {
        const cat = this.categs.find(categ => categ.id == updatedCateg.id)
        if(!cat) {
            return of(null)
        } else {
            this.categs = this.categs.map(categ => categ.id == updatedCateg.id ? updatedCateg : categ)
            return of(this.categs)
        }
    }
    
    override remove(id: number): Observable<ICategory[] | null> {
        const cat = this.categs.find(categ => categ.id == id)
        if(!cat) {
            return of(null)
        } else {
            this.categs = this.categs.filter(categ => categ.id != id)
            return of(this.categs)
        }
    }
}