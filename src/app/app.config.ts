import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { CalendarState } from './core/stores/calendar/calendar.state';
import { EventState } from './core/stores/event/event.state';
import { GlobalState } from './core/stores/global/global.state';
import { CategoryState } from './core/stores/category/category.state';
import { DEFAULT_IN_MEMORY_PROVIDERS, DEFAULT_LOCAL_STORAGE_PROVIDERS } from './shared/values/default-providers.values';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule,NgxsModule.forRoot([ GlobalState, CalendarState, EventState, CategoryState ])),
    // ...DEFAULT_IN_MEMORY_PROVIDERS,
    ...DEFAULT_LOCAL_STORAGE_PROVIDERS
  ],
};
