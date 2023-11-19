import { ICategory } from "../category.model"
import { IEvent, IEventCategory, TEvent_type } from "../event.model"
import { StubCategoryBuilder } from "./category.builder"

interface IEventBuildParam {
    categName?: 'Mariage'|'Baptême',
}

export class EventBuilder {
    protected id: number
    protected date: string
    protected place: string
    protected customer: string
    protected category: IEventCategory
    protected type: TEvent_type
    protected confirm: boolean
    protected infos: string
    protected createdAt: Date = new Date()

    withId(id: number): EventBuilder {
        this.id = id
        return this
    }

    withDate(date: string): EventBuilder {
        this.date = date
        return this
    }

    withPlace(place: string): EventBuilder {
        this.place = place
        return this
    }

    withCateg(categ: IEventCategory): EventBuilder {
        this.category = categ
        return this
    }

    withCustomer(customer: string): EventBuilder {
        this.customer = customer
        return this
    }

    withType(type: TEvent_type): EventBuilder {
        this.type = type
        return this
    }

    withConfirmed(): EventBuilder {
        this.confirm = true
        return this
    }

    withUnConfirmed(): EventBuilder {
        this.confirm = false
        return this
    }

    withInfos(infos: string): EventBuilder {
        this.infos = infos
        return this
    }

    build(param: IEventBuildParam|null = null): IEvent {
        if (param)
            if(param.categName){
                const categDetail: ICategory = new StubCategoryBuilder().build(param.categName)
                this.category = { id: categDetail.id, name: categDetail.name, color: categDetail.color }
            }
        return {
            id: this.id,
            date: this.date,
            place: this.place,
            category: this.category,
            customer: this.customer,
            type: this.type,
            confirm: this.confirm,
            infos: this.infos, 
            createdAt: this.createdAt
        }
    }
}

export class StubEventBuilder extends EventBuilder {
    protected override id: number = 0
    protected override date: string = '11/11/2023'
    protected override customer: string = 'Customer'
    protected override place: string = 'The palace'
    protected override type: TEvent_type = 'Day'
    protected categDetail: ICategory = new StubCategoryBuilder().build()
    protected override category: IEventCategory = { id: this.categDetail.id, name: this.categDetail.name, color: this.categDetail.color }
    protected override confirm: boolean = true
    protected override infos: string = 'lorem ipsum'
    protected override createdAt: Date = new Date()
}