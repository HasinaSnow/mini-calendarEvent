import { Routes } from '@angular/router';
import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { IDataUrl } from './shared/interfaces/data-url.interface';
import { SetTitlePage } from './core/stores/global/global.action';
import { RetrieveAllCategs } from './core/stores/category/category.action';
import { RetrievAllEvents } from './core/stores/event/event.action';
import { ABOUT_ROUTE, CATAEG_NEW_ROUTE, CATEG_EDIT_ROUTE, CATEG_ROUTE, EVENT_DETAIL_ROUTE, EVENT_EDIT_ROUTE, EVENT_NEW_ROUTE, EVENT_ROUTE, HOME_ROUTE, NOT_FOUND_ROUTE } from './shared/values/default-routes.values';

export const routes: Routes = [
  { 
    path: '',
    children: [
      {
        path: '',
        redirectTo: HOME_ROUTE.path,
        pathMatch: 'full'
      },
      {
        path: HOME_ROUTE.path,
        title: HOME_ROUTE.title,
        resolve: { 
          getAllEvents : () => inject(Store).dispatch(new RetrievAllEvents()),
          setTitlePage : () => inject(Store).dispatch(new SetTitlePage(HOME_ROUTE.title))
        },
        loadComponent: () => import('./views/calendar/calendar.component').then(m => m.CalendarComponent),
      },
      {
        path: EVENT_ROUTE.path,
        title: EVENT_ROUTE.title,
        children: [
          {
            path: '',
            resolve: { 
              getAllEvents : () => inject(Store).dispatch(new RetrievAllEvents()),
              getAllCategs : () => inject(Store).dispatch(new RetrieveAllCategs()),
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(EVENT_ROUTE.title))
            },
            loadComponent: () => import('./views/event/event.component').then(m => m.EventComponent),
          },
          {
            path: EVENT_NEW_ROUTE.path,
            title: EVENT_NEW_ROUTE.title,
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(EVENT_NEW_ROUTE.title))
            },
            loadComponent: () => import('./views/event/pages/event-new/event-new.component').then(m => m.EventNewComponent)
          },
          {
            path: EVENT_DETAIL_ROUTE.path + '/:id',
            title: EVENT_DETAIL_ROUTE.title,
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(EVENT_DETAIL_ROUTE.title))
            },
            loadComponent: () => import('./views/event/pages/event-detail/event-detail.component').then(m => m.EventDetailComponent)
          },
          {
            path: EVENT_EDIT_ROUTE.path + '/:id',
            title: EVENT_EDIT_ROUTE.title,
            resolve: { 
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(EVENT_EDIT_ROUTE.title))
            },
            loadComponent: () => import('./views/event/pages/event-edit/event-edit.component').then(m => m.EventEditComponent)
          }
        ]
      },
      {
        path: CATEG_ROUTE.path,
        children: [
          {
            path: '',
            title: CATEG_ROUTE.path,
            resolve: {
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(CATEG_ROUTE.title)),
              getAllCategs : () => inject(Store).dispatch(new RetrieveAllCategs()),
            },
            loadComponent: () => import('./views/category/category.component').then(m => m.CategoryComponent)
          },
          {
            path: CATAEG_NEW_ROUTE.path,
            title: CATAEG_NEW_ROUTE.title,
            resolve: {
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(CATAEG_NEW_ROUTE.title)),
            },
            loadComponent: () => import('./views/category/pages/categ-new/categ-new.component').then(m => m.CategNewComponent)
          },
          {
            path: CATEG_EDIT_ROUTE.path + '/:id',
            title: CATEG_EDIT_ROUTE.title,
            resolve: {
              setTitlePage : () => inject(Store).dispatch(new SetTitlePage(CATEG_EDIT_ROUTE.title)),
            },
            loadComponent: () => import('./views/category/pages/categ-edit/categ-edit.component').then(m => m.CategEditComponent)
          }
        ]
      },
      {
        path: ABOUT_ROUTE.path,
        title: ABOUT_ROUTE.title,
        resolve: {
          setTitlePage : () => inject(Store).dispatch(new SetTitlePage(ABOUT_ROUTE.title)),
        },
        loadComponent:() => import('./views/about/about.component').then(m => m.AboutComponent)
      }
    ]
  },
  { 
    path: NOT_FOUND_ROUTE.path,
    title: NOT_FOUND_ROUTE.title,
    resolve: { 
      setTitlePage : () => inject(Store).dispatch(new SetTitlePage(NOT_FOUND_ROUTE.title))
    },
    loadComponent: () => import('./shared/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];