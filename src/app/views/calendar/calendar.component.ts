import { Component, OnInit, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';
import { IEvent, IEventCalendar, IEventCard } from 'src/app/core/models/event.model';
import { EventListComponent } from './components/event-list/event-list.component';
import { Store } from '@ngxs/store';
import { CalendarSelectors } from 'src/app/core/stores/calendar/calendar.selectors';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarEventComponent, EventListComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private store: Store = inject(Store)

  eventsMonthCalendar: Signal<IEventCalendar[]> = toSignal(this.store.select(CalendarSelectors.getEventsMonthCalendar()), { initialValue: [] as IEventCalendar[]})
  // get the events list
  // events = toSignal(this.store.select(state => state.calendar.events))
  eventsCard: Signal<IEventCard[]> = toSignal(this.store.select(CalendarSelectors.getEventSelectedCard()), { initialValue: [] as IEventCard[] })
  monthSelected: Signal<number> = toSignal(this.store.select((state) => state.calendar.monthSelected))
  yearSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.yearSelected))
  dateSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.dateSelected))

  ngOnInit(): void {
  }

}
