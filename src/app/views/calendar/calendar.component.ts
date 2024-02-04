import { Component, OnInit, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';
import { IEventCalendar, IEventCard } from 'src/app/core/models/event.model';
import { Store } from '@ngxs/store';
import { CalendarSelectors } from 'src/app/core/stores/calendar/calendar.selectors';
import { Router } from '@angular/router';
import { EVENT_ROUTE } from 'src/app/shared/values/default-routes.values';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarEventComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private store: Store = inject(Store)
  private router: Router = inject(Router)

  eventsMonthCalendar: Signal<IEventCalendar[]> = toSignal(this.store.select(CalendarSelectors.getEventsMonthCalendar()), { initialValue: [] as IEventCalendar[]})
  eventsCard: Signal<IEventCard[]> = toSignal(this.store.select(CalendarSelectors.getEventSelectedCard()), { initialValue: [] as IEventCard[] })
  monthSelected: Signal<number> = toSignal(this.store.select((state) => state.calendar.monthSelected))
  yearSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.yearSelected))
  dateSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.dateSelected))

  ngOnInit(): void {
  }

  onClickDate() {
    this.router.navigate([EVENT_ROUTE.path])
  }

}
