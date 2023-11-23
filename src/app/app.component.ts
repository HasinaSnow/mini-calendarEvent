import { Component, OnInit, Signal, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet, TitleStrategy } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { register } from 'swiper/element/bundle';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AppService } from './shared/services/app.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IDataUrl } from './shared/interfaces/data-url.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PanelModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    TabMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private store = inject(Store)
  private route: ActivatedRoute = inject(ActivatedRoute)
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined = [
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', url: 'calendar' },
    { label: 'Event', icon: 'pi pi-fw pi-calendar', url: 'event' },
    { label: 'Category', icon: 'pi pi-fw pi-pencil', url: 'category' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', url: 'settings' },
  ];

  titlePage: Signal<string> = toSignal(this.store.select(store => store.global.titlePage), { initialValue: '' })

  ngOnInit(): void {

  }

}
