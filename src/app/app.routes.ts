import { Routes } from '@angular/router';
import { Store } from '@ngxs/store';
import { RetrievAllEvents } from './core/stores/calendar/calendar.action';
import { inject } from '@angular/core';

export const routes: Routes = [
  { 
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
      },
      {
        path: 'event',
        title: 'Event',
        children: [
          {
            path: '',
            resolve: { _: () => inject(Store).dispatch(new RetrievAllEvents()) },
            loadComponent: () => import('./views/event/event.component').then(m => m.EventComponent),
          },
          {
            path: 'detail/:id',
            loadComponent: () => import('./views/event/pages/event-detail/event-detail.component').then(m => m.EventDetailComponent)
          }
        ]
      },
      {
        path: 'calendar',
        title: 'Calendar',
        loadComponent: () => import('./views/calendar/calendar.component').then(m => m.CalendarComponent),
      }
    ]
  },
  { 
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];