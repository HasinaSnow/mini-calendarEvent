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
}