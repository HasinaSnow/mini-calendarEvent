export interface IDataDialogConfirm {
    content?: IIconText,
    btnAccept?: IIconText,
    btnReject?: IIconText
}

export interface IIconText {
    text: string,
    icon: string
}