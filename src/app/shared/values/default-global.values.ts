import { IDataDialogConfirm } from "../interfaces/data-dialog-confirm.interface";

export const REGEX_DATE_PATTERN = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;

export const DATA_DIALOG_CONFIRM_DELETE_EVENT: IDataDialogConfirm = {
    content: {
        icon: 'pi pi-exclamation-triangle',
        text: 'Confirmation to delete this Event?'
    },
    btnAccept: {
        icon: '',
        text: 'I confirm to Delete'
    },
    btnReject: {
        icon: 'pi pi-times',
        text: 'No'
    }
}