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
import { DisableToast } from './core/stores/global/global.action';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToastModule,
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

  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined = [
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', url: 'calendar' },
    { label: 'Event', icon: 'pi pi-fw pi-calendar', url: 'event' },
    { label: 'Category', icon: 'pi pi-fw pi-pencil', url: 'category' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', url: 'settings' },
  ];

  // toast manager
  dataToast: Signal<IInfosToast> = toSignal(this.store.select(store => store.global.dataToast))
  toastEnabled: Signal<boolean> = toSignal(this.store.select(store => store.global.toastEnabled))
  enableToastEffect = effect(() => {
    console.log('enable toast change: ', this.toastEnabled());
    this.manageToast()
  }, { allowSignalWrites: true });

  titlePage: Signal<string> = toSignal(this.store.select(store => store.global.titlePage), { initialValue: '' })


  private manageToast() {
    if(this.toastEnabled()) {
      // call
      this.msgToast.add(this.dataToast())
      // disable
      this.store.dispatch(new DisableToast())
    }
  }

}
