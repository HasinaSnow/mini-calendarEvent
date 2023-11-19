import { IEventDetailItem } from "../event.model"
import { ILabel } from "../label.model"

export class EventItemBuilder {
    protected id: number
    protected label: ILabel
    protected value: string
    protected dateValue: Date|null
    protected withCreated: boolean
    protected createdAt: Date|undefined

    withId(id: number): EventItemBuilder {
        this.id = id
        return this
    }

    withLabel(label: ILabel): EventItemBuilder {
        this.label = label
        return this
    }

    withValue(value: string): EventItemBuilder {
        this.value = value
        return this
    }

    withCreatedAtItem(): EventItemBuilder {
        this.withCreated = true
        return this
    }

    withNotCreatedAtItem(): EventItemBuilder {
        this.withCreated = false
        return this
    }

    withCreatedAt(createdAt: Date|undefined): EventItemBuilder {
        this.createdAt = createdAt
        return this
    }

    buildEventItem(): IEventDetailItem {
        return {
            id: this.id,
            label: this.label,
            value: this.value,
            dateValue: this.dateValue,
            withCreated: this.withCreated,
            createdAt: this.createdAt
        }
    }

}
