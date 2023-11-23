import { Observable } from "rxjs";
import { ICategory } from "../models/category.model";

export abstract class CategGateway {
    abstract retrieveAll(): Observable<ICategory[]>
    abstract retrieveOne(id: number): Observable<ICategory| null>
}