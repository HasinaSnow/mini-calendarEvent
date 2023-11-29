import { Component, Signal, effect, inject } from '@angular/core';
import { RouterOutlet,  } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { register } from 'swiper/element/bundle';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { ToastModule } from 'primeng/toast';
import { IInfosToast } from './shared/interfaces/info-toast.interface';
import { AcceptDialogConfirmation, CloseDialogConfirmation, DisableToast } from './core/stores/global/global.action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteEvent } from './core/stores/event/event.action';
import { IDataDialogConfirm } from './shared/interfaces/data-dialog-confirm.interface';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    TabMenuModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private store = inject(Store)
  private msgToast = inject(MessageService)
  private confirmationService = inject(ConfirmationService)

  titlePage: Signal<string> = toSignal(this.store.select(store => store.global.titlePage), { initialValue: '' })

  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined = [
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', url: 'calendar' },
    { label: 'Event', icon: 'pi pi-fw pi-calendar-plus', url: 'event' },
    { label: 'Category', icon: 'pi pi-fw pi-star', url: 'category' },
    { label: 'About', icon: 'pi pi-fw pi-id-card', url: 'about' },
  ];

  // toast manager
  dataToast: Signal<IInfosToast> = toSignal(this.store.select(store => store.global.dataToast))
  toastEnabled: Signal<boolean> = toSignal(this.store.select(store => store.global.toastEnabled))
  enableToastEffect = effect(() => {
    console.log('enable toast change: ', this.toastEnabled());
    this.manageToast()
  }, { allowSignalWrites: true });

  // dialog confiramtion manager
  dataDialog: Signal<IDataDialogConfirm> = toSignal(this.store.select(store => store.global.dataDialogConfirmation))
  dialogConfirmationOpened: Signal<boolean> = toSignal(this.store.select(store => store.global.dialogConfirmationOpened))
  openDialogConfirmationEffect = effect(() => {
    console.log('dialog opened change: ', this.dialogConfirmationOpened());
    this.manageDialogConfirm()
  }, { allowSignalWrites: true });

  private manageToast() {
    if(this.toastEnabled()) {
      this.msgToast.add(this.dataToast()) // call action
      this.store.dispatch(new DisableToast()) //disable
    }
  }

  private manageDialogConfirm() {
    if(this.dialogConfirmationOpened()) {
      this.confirmationService.confirm({
        accept: () => {
          this.store.dispatch(new AcceptDialogConfirmation()) // call action
          this.store.dispatch(new CloseDialogConfirmation()) // disable
        },
        reject: () => {}
      });
    }
  }

}
