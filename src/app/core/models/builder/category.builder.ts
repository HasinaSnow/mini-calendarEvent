import { ICategory } from "../category.model"

export class Categorybuilder {
    protected id: number
    protected name: string
    protected color: string
    protected infos: string
    protected createdAt: Date

    withId(id: number): Categorybuilder {
        this.id = id
        return this
    }

    withName(name: string): Categorybuilder {
        this.name = name
        return this
    }

    withColor(color: string): Categorybuilder {
        this.color = color
        return this
    }

    withInfos(infos: string): Categorybuilder {
        this.infos = infos
        return this
    }

    build(categName: 'Mariage'|'Baptême'| 'Sortie de promotion'| 'Fiançaille' | undefined = undefined): ICategory {
        if(categName)
            switch (categName) {
                case 'Mariage': {
                    this.id = 0,
                    this.name = 'Mariage'
                    this.color = '#c71879'
                    break;
                }
                case 'Baptême': {
                    this.id = 1,
                    this.name = 'Baptême'
                    this.color = '#bf770b'
                    break;
                }
                case 'Sortie de promotion': {
                    this.id = 2,
                    this.name = 'Sortie de promotion'
                    this.color = '#17cfa4'
                    break;
                }
                case 'Fiançaille': {
                    this.id = 3,
                    this.name = 'Fiançaille'
                    this.color = '#7abd10'
                    break;
                }
            }

        return {
            id: this.id,
            name: this.name,
            color: this.color,
            infos: this.infos,
            createdAt: this.createdAt
        }
    }
}

export class StubCategoryBuilder extends Categorybuilder {
    protected override id = 1
    protected override name = 'Mariage'
    protected override color = '#f234'
    protected override infos = 'lorem ipsum'
    protected override createdAt = new Date()
}