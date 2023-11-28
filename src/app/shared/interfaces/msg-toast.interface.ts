export interface IMsgToast {
    type: ITypeToast,
    msg: string
}

export type ITypeToast = 'warn'|'info'|'success'|'secondary'