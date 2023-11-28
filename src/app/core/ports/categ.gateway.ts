import { Observable } from "rxjs";
import { ICategory } from "../models/category.model";

export abstract class CategGateway {
    abstract retrieveAll(): Observable<ICategory[]>
    abstract retrieveOne(id: number): Observable<ICategory| null>
    abstract addNew(categ: ICategory): Observable<ICategory>
    abstract edit(categ: ICategory): Observable<ICategory[]|null>
    abstract remove(id: number): Observable<ICategory[]|null>
}