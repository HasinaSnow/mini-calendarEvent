import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet, TitleStrategy } from '@angular/router';
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

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PanelModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    TabMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined = [
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', url: 'calendar' },
    { label: 'Event', icon: 'pi pi-fw pi-calendar', url: 'event' },
    { label: 'Category', icon: 'pi pi-fw pi-pencil', url: 'category' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', url: 'settings' },
  ];

  ngOnInit(): void {
  }

}
