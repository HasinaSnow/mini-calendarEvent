import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEventCalendar } from 'src/app/core/models/event.model';
import { CalendarEventService, TDay, TMonth } from './calendar-event.service';
import { Store } from '@ngxs/store';
import { DateToSelected, MonthToDecremented, MonthToIncremented, MonthToSelected, ResetonToday, YearToDecremented, YearToIncremented, YearToSelected } from 'src/app/core/stores/calendar/calendar.action';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarEventComponent {
  private store: Store = inject(Store)

  
  @Input() events: Signal<IEventCalendar[]> = signal([] as IEventCalendar[])
  @Output() onclickDate: EventEmitter<void> = new EventEmitter()

  calendarService = inject(CalendarEventService)
  firstDaysInactives: Signal<number[]> = this.calendarService.firstDaysInactives
  lastDaysInactives: Signal<number[]> = this.calendarService.lastDaysInactives
  daysActives: Signal<number[]> = this.calendarService.daysActives
  monthsName: TMonth[] = this.calendarService.months
  daysName: TDay[] = this.calendarService.daysName

  daySelected: Signal<number> = this.calendarService.daySelected
  monthSelected: Signal<number> = this.calendarService.monthSelected
  yearSelected: Signal<number> = this.calendarService.yearSelected
  monthNameSelected: Signal<TMonth> = this.calendarService.monthNameSelected

  toggleDisplay: boolean = true

  twoSwipper: Array<string> = ['one', 'two']

  swiper: Document

  ngOnInit() {
  }

  log(){
    console.log('next slide')
  }

  onNextMonth() : void {
    this.store.dispatch(new MonthToIncremented())
  }

  onToggleDisplay(): void {
    this.toggleDisplay = !this.toggleDisplay
  }

  onPreviousMonth(): void {
    this.store.dispatch(new MonthToDecremented())
  }

  onNextYear(): void {
    this.store.dispatch(new YearToIncremented())
  }

  onPreviousYear(): void {
    this.store.dispatch(new YearToDecremented())
  }

  onSelectMonth(month: number): void {
    this.store.dispatch(new MonthToSelected(month))
  }

  onSelectYear(year: number): void {
    this.store.dispatch(new YearToSelected(year))
  }

  onSelectDate(date: number): void {
    this.store.dispatch(new DateToSelected(date))
    this.onclickDate.emit()
  }

  onToday(): void {
    this.store.dispatch(new ResetonToday())
    this.onToggleDisplay()
  }

  isToday(dateNumber: number): boolean {
    return this.calendarService.isToday(dateNumber)
  }

  isEvent(date: number): boolean {
    return this.calendarService.isEvent(date, this.events)
  }

  isDateSelected(dateNumber: number): boolean {
    return this.calendarService.isDateEventActive(dateNumber)
  }

  eventsOfThisDate (date: number): IEventCalendar[] {
    return this.calendarService.getEventsOfThisDate(date, this.events)
  }

  /**
   * build a linear-gradient css style for the color of this date (offer.color)
   * @param date : dateNumber
   * @returns string
   */
  clrEventsOfThisDate (date: number): string {
    return this.calendarService.getClrEventsOfThisDate(date, this.events)
  }

  /**
   * animate the element who have a selector in param
   * @param selector string
   */
  // onAnimate(selector: string | void) {
  //   let elementToAnimate = this.elementRef.nativeElement.querySelectorAll('.days, .current-date span, .current-year span')

  //   if(selector)
  //     elementToAnimate = this.elementRef.nativeElement.querySelectorAll(selector)

  //   this.animationFondue.animateElement(elementToAnimate)
  // }

}
