export interface ICategory {
    id: number,
    name: string,
    color: string,
    infos: string
    createdAt: Date
}

export interface ICategInitial {
    id: number,
    name: string|null,
    color: string|null,
    infos: string|null
}