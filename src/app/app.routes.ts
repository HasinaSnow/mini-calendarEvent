import { Routes } from '@angular/router';
import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { IDataUrl } from './shared/interfaces/data-url.interface';
import { SetTitlePage } from './core/stores/global/global.action';
import { RetrieveAllCategs } from './core/stores/category/category.action';
import { RetrievAllEvents } from './core/stores/event/event.action';

export const routes: Routes = [
  { 
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
      },
      {
        path: 'calendar',
        title: 'Calendar',
        resolve: { 
          getAllEvents : () => inject(Store).dispatch(new RetrievAllEvents()),
          setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Calendar Event'))
        },
        loadComponent: () => import('./views/calendar/calendar.component').then(m => m.CalendarComponent),
      },
      {
        path: 'event',
        title: 'Event',
        children: [
          {
            path: '',
            data: { title: 'Event' } as IDataUrl,
            resolve: { 
              getAllEvents : () => inject(Store).dispatch(new RetrievAllEvents()),
              getAllCategs : () => inject(Store).dispatch(new RetrieveAllCategs()),
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Event'))
            },
            loadComponent: () => import('./views/event/event.component').then(m => m.EventComponent),
          },
          {
            path: 'new',
            title: 'New Event',
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Event creation'))
            },
            loadComponent: () => import('./views/event/pages/event-new/event-new.component').then(m => m.EventNewComponent)
          },
          {
            path: 'detail/:id',
            title: 'Event Detail',
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Event detail'))
            },
            loadComponent: () => import('./views/event/pages/event-detail/event-detail.component').then(m => m.EventDetailComponent)
          },
          {
            path: 'edit/:id',
            title: 'Event Edit',
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Event edition'))
            },
            loadComponent: () => import('./views/event/pages/event-edit/event-edit.component').then(m => m.EventEditComponent)
          }
        ]
      }
    ]
  },
  { 
    path: '**',
    title: 'Not found',
    resolve: { 
      setTitlePage : () => inject(Store).dispatch(new SetTitlePage('Page not found'))
    },
    loadComponent: () => import('./shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];