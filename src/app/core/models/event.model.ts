import { ILabel } from "./label.model"

export interface IEvent {
    id: number,
    date: Date,
    place: string,
    category: IEventCategory,
    customer: string,
    type: TEvent_type,
    confirm: boolean,
    infos: string,
    createdAt: Date
}

export interface IEventInitial {
    id: number,
    date: null|Date,
    category: null|IEventCategory,
    place: string|null,
    customer: string|null,
    confirm: boolean|null,
    infos: string|null
  }

export interface IEventConfirm {
    key: string,
    label: string,
    value: boolean
}

export interface IEventOption {
    label: string,
    icon: string
}

export type TEvent_type = 'Day'|'Night'

export interface IEventCard {
    id: number,
    date: Date,
    place: string,
    category: IEventCategory,
    customer: string,
    type: TEvent_type,
    confirm: boolean,
}

export interface IEventLabels {
    dateLabel: ILabel,
    placeLabel: ILabel
    typeLabel: ILabel,
    categLabel: ILabel,
    customerLabel: ILabel,
    confirmedLabel: ILabel,
    notConfirmedLabel: ILabel,
    infosLabel: ILabel
}

export interface IEventCategory {
    id: number,
    name: string,
    color: string
}

export interface IEventCalendar {
    id: number,
    date: Date,
    color: string
}

export interface IEventBuildParam {
    categName?: 'Mariage'|'Baptême',
}