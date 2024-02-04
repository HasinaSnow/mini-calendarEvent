import { Injectable, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { DisableToast, EnableToast } from "src/app/core/stores/global/global.action";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private store = inject(Store)

    warnMsg(msg: string) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'warn', summary: 'warn', detail: msg }))
    }

    infoMsg(msg: string) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'info', summary: 'info', detail: msg }))
    }

    successMsg(msg: string) {
        this.store.dispatch(new EnableToast({ key: 'tc', severity: 'success', summary: 'success', detail: msg }))
    }

    disable() {
        this.store.dispatch(new DisableToast())
    }
}