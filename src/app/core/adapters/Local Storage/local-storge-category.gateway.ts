import { Observable, of } from "rxjs";
import { CategGateway } from "../../ports/categ.gateway";
import { ICategory } from "../../models/category.model";

export class LocalStorageCategoryGateway extends CategGateway {

    withCategs(categs: ICategory[]): LocalStorageCategoryGateway {
        categs.forEach(categ => {
            this.addNew(categ)
        });
        return this
    }

    override retrieveAll(): Observable<ICategory[]> {
        return of(this.getCategs())
    }

    override retrieveOne(id: number): Observable<ICategory | null> {
        const oneById = this.getOne(id)
        return of(oneById != undefined ? oneById : null)
    }

    override addNew(categ: ICategory): Observable<ICategory> {
       const categs = this.getCategs()
       const lastId = this.getLastId()
       categ.id = lastId + 1
       this.updateCategs([ ...categs, categ])
       return of(categ)
    }

    override edit(categ: ICategory): Observable<ICategory[] | null> {
        const categs = this.getCategs()
        const newCategs: ICategory[] = categs.map(e => e.id == categ.id ? categ : e )
        this.updateCategs(newCategs)
        return of(categs)
    }

    override remove(id: number): Observable<ICategory[] | null> {
        const categs = this.getCategs()
        if(categs.find(categ => categ.id == id) === undefined)
            return of(null)
        const newCategs = this.getCategs().filter(categ => categ.id !== id)
        this.updateCategs(newCategs)
        return of(newCategs)
    }

    private getCategs(): ICategory[] {
        const categs = localStorage.getItem('categories')
        return !categs ? [] as ICategory[] : JSON.parse(categs)
    }

    private getOne(id: number): ICategory|undefined {
        const categs = this.getCategs()
        const oneByid = categs.find(categ => categ.id == id)
        return oneByid
    }

    private getLastId(): number{
        const categsUsed = this.getCategs()
        const lastCateg = categsUsed.pop()
        return lastCateg != undefined ? lastCateg.id : 1
    }

    private updateCategs(categs: ICategory[]): void {
        localStorage.setItem('categories', JSON.stringify(categs))
    }
}