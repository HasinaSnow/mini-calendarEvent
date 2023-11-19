import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { EventGateway } from './core/ports/event.gateway';
import { InMemoryEventGateway } from './core/adapters/in-memory-event.gateway';
import { CalendarState } from './core/stores/calendar/calendar.state';
import { StubEventBuilder } from './core/models/builder/event.builder';
import { EventState } from './core/stores/event/event.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule,NgxsModule.forRoot([CalendarState, EventState])),
    {
      provide: EventGateway,
      useValue: new InMemoryEventGateway().withEvents([
        new StubEventBuilder().withId(2).withConfirmed().build({categName: 'Mariage'}),
        new StubEventBuilder().withId(3).withUnConfirmed().build({categName: 'Baptême'}),
        new StubEventBuilder().withId(1).withConfirmed().build({categName: 'Mariage'}),
        new StubEventBuilder().withId(2).withConfirmed().build({categName: 'Mariage'}),
        new StubEventBuilder().withId(3).withUnConfirmed().build({categName: 'Baptême'}),
        new StubEventBuilder().withId(1).withConfirmed().build({categName: 'Mariage'}),
      ],)
    }
  ],
};
