import { Injectable, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { IEventCalendar } from 'src/app/core/models/event.model';
import { DateSelected, DaySelected, MonthSelected, YearSelected } from 'src/app/core/stores/calendar/calendar.action';

export type TMonth = 'Jan'|'Feb'|'Mar'|'Apr'|'May'|'Jun'|'Jul'|'Aug'|'Sep'|'Oct'|'Nov'|'Dec' 
export type TMonth_number = 0|1|2|3|4|5|6|7|8|9|10|11
export type TDay = 'Sun'|'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'
@Injectable({
  providedIn: 'root',
})
export class CalendarEventService {

  private lastDateOfPreviousMonth: Signal<number> = computed(() =>
    new Date(this.yearSelected(), this.monthSelected(), 0).getDate()
  )
  private lastDateOfCurrentMonth: Signal<number> = computed(() => 
    new Date(this.yearSelected(), this.monthSelected() + 1, 0).getDate()
  )
  private firstDayOfCurrentMonth: Signal<number> = computed(() => 
    new Date(this.yearSelected(), this.monthSelected(), 1).getDay()
  )

  private firstDateOfnextMonth: Signal<Date> = computed(() => 
    new Date(this.yearSelected(), this.monthSelected() + 1, 1)
  )
  private firstDayOfNextMonth: Signal<number> = computed(() => 
    this.firstDateOfnextMonth().getDay()
  )

  firstDaysInactives: Signal<number[]> = computed(() => {
    let tab: number[] = [];
    for (let i = this.firstDayOfCurrentMonth(); i > 0; i--) {
      tab.push(this.lastDateOfPreviousMonth() - i + 1);
    }
    return tab
  });
  daysActives: Signal<number[]> = computed(() => {
    let tab: number[] = [];
    for (let i = 1; i <= this.lastDateOfCurrentMonth(); i++)
      tab.push(i);
    return tab
  });
  lastDaysInactives: Signal<number[]> = computed(() => {
    if (this.firstDateOfnextMonth().getDay() == 0) 
      return []
    else {
      let tab: number[] = [];
      for (let i = this.firstDayOfNextMonth(); i < 7; i++) {
      tab.push(i - this.firstDayOfNextMonth() + 1);
    }
    return tab
  }
  });

  months: TMonth[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  daysName: TDay[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  private store: Store = inject(Store)
  daySelected: Signal<number> = toSignal(this.store.select((state) => state.calendar.dayselected))
  dateSelected: Signal<number> = toSignal(this.store.select((state) => state.calendar.dateSelected))
  fullDateSelected: Signal<Date> = toSignal(this.store.select(state => state.calendar.fullDateSelected))
  monthSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.monthSelected))
  yearSelected: Signal<number> = toSignal(this.store.select(state => state.calendar.yearSelected));

  monthNameSelected: Signal<TMonth> = computed(() => this.months[this.monthSelected()])

  dateNumberOfEventListShowed: WritableSignal<number[]> = signal([]);

  // dateNumberActive: WritableSignal<number> = signal(0);
  eventListActive: WritableSignal<IEventCalendar[]> = signal([]);

  isToday(dateNumber: number): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDateNumber = new Date().getDate();

    return (
      currentDateNumber == dateNumber &&
      currentMonth == this.monthSelected() &&
      currentYear == this.yearSelected()
    );
  }

  isEvent(date: number, events: Signal<IEventCalendar[]>): boolean {
    return (
      events().filter((event) => {
        const d: Date = new Date(event.date);
        return (
          date == d.getDate() &&
          this.monthSelected() == d.getMonth() &&
          this.yearSelected() == d.getFullYear()
        );
      }).length > 0
    );
  }

  getEventLength(dateNumber: number, events: Signal<IEventCalendar[]>): number {
    return events().filter((event) => dateNumber == new Date(event.date).getDate())
      .length;
  }

  getEventsOfThisDate(date: number, events: Signal<IEventCalendar[]>): IEventCalendar[] {
    return events().filter((event) => {
      const d: Date = new Date(event.date);
      return (
        date == d.getDate() &&
        this.monthSelected() == d.getMonth() &&
        this.yearSelected() == d.getFullYear()
      );
    });
  }

  /**
   * verify if the dateNumber is the the dateEvent actived
   * @param dateNumber number
   * @returns boolean
   */
  isDateEventActive(dateNumber: number): boolean {
    const fullDate: Date = this.fullDateSelected()
    return (
      this.dateSelected() == dateNumber &&
      this.monthSelected() == fullDate.getMonth() && 
      this.yearSelected() == fullDate.getFullYear()
    )
  }

  /**
   * active the first most dateEvents of the eventList
   */
  // activeDefaultDateEvent(events: Signal<IEventCalendar[]>): void {
  //   if (events().length > 0) {
  //       const dateNumber: number = new Date(this.getNearestEvent(events).date).getDate()
  //       this.setdateNumberEventActive(dateNumber)
  //   }
  // }

  /**
   * return the nearest event (évènement le plus proche)
   * @param events signal<IEventCalendar[]
   * @returns IEventCalendar
   */
  private getNearestEvent(events: Signal<IEventCalendar[]>): IEventCalendar {
    return events()
        .filter(event => new Date(event.date) >= new Date())
        .reduce((p, c) => new Date(p.date) <= new Date(c.date) ? p : c )
  }

  /**
   * build a linear-gradient css style for the color of this date (offer.color)
   * @param date : dateNumber
   * @returns string
   */
  getClrEventsOfThisDate(date: number, events: Signal<IEventCalendar[]>): string {
    const colors: string[] = this.getEventsOfThisDate(date, events).map(
      (event) => event.color
    );
    return [...new Set(colors)].length > 1
      ? `linear-gradient(120deg, ${[...new Set(colors)].join(', ')})`
      : [...new Set(colors)].join(', ');
  }

  /**
   * filter the eventList showed for the month and year
   * @param eventList IEventCalendar[]
   */
  // setevents(events: IEventCalendar[]): void {
  //   this.events.set(
  //     eventList.filter((event) => {
  //       const d = new Date(event.date);
  //       return (
  //         this.monthSelected() == d.getMonth() &&
  //         this.yearSelected() == d.getFullYear()
  //       );
  //     })
  //   );
  // }
}
