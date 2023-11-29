import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EventCardComponent } from '../calendar/components/event-card/event-card.component';
import { Store } from '@ngxs/store';
import { IEventCalendar, IEventCard } from 'src/app/core/models/event.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarSelectors } from 'src/app/core/stores/calendar/calendar.selectors';
import { DialogModule } from 'primeng/dialog';
import { CalendarEventComponent } from '../calendar/components/calendar-event/calendar-event.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DeleteEvent } from 'src/app/core/stores/event/event.action';
import { DATA_DIALOG_CONFIRM_DELETE_EVENT } from 'src/app/shared/values/default-global.values';
import { OpenDialogConfirmation, RejectDialogConfirmation } from 'src/app/core/stores/global/global.action';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    EventCardComponent,
    CalendarEventComponent,
    DialogModule,
    MenuModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  private store = inject(Store);
  private route = inject(Router)

  isVisibleCalendarDialog: boolean = false
  isVisibleEventOptionDialog: boolean = false
  eventIdClicked: number = 0
  eventOptions: MenuItem[] = [
    {
      label: 'View detail',
      icon: 'pi pi-eye',
      command: () => this.comandOnEventDetail()
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => this.comandOnEventEdit()
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.comandOnEventDelete()
    },
  ];

  // manage dialog confirmation
  dialogConfirmationAccepted: Signal<boolean> = toSignal(this.store.select(store => store.global.dialogConfirmationAccepted))
  AcceptDialogConfirmEffect = effect(() => {
    console.log('dialog confirm accepted change: ', this.dialogConfirmationAccepted());
    this.manageDialogConfirm()
  }, { allowSignalWrites: true });

  fullDateSelected: Signal<Date> = toSignal(this.store.select(state => state.calendar.fullDateSelected))
  eventsMonthCalendar: Signal<IEventCalendar[]> = toSignal(this.store.select(CalendarSelectors.getEventsMonthCalendar()), { initialValue: [] as IEventCalendar[]})
  eventsCardSelected: Signal<IEventCard[]> = toSignal(this.store.select(CalendarSelectors.getEventsCardSelected()), { initialValue: [] as IEventCard[] });

  ngOnInit(): void {
  }

  onCreate() {
    this.route.navigate(['event/new'])
  }

  private comandOnEventDetail() {
    this.closeEventOptionsDialog()
    this.route.navigate(['event/detail', this.eventIdClicked])
  }

  private comandOnEventEdit() {
    this.closeEventOptionsDialog()
    this.route.navigate(['event/edit', this.eventIdClicked])
  }

  private comandOnEventDelete() {
    this.closeEventOptionsDialog()
    this.store.dispatch(new OpenDialogConfirmation(DATA_DIALOG_CONFIRM_DELETE_EVENT))
  }

  onEventClicked(eventId: number) {
    this.eventIdClicked = eventId
    this.showEventOptionsDialog()
  }

  showEventOptionsDialog() {
    this.isVisibleEventOptionDialog = true
  }

  closeEventOptionsDialog() {
    this.isVisibleEventOptionDialog = false
  }

  showCalendarDialog() {
    this.isVisibleCalendarDialog = true
  }

  closeCalendarDialog() {
    this.isVisibleCalendarDialog = false
  }

  private manageDialogConfirm() {
    if(this.dialogConfirmationAccepted()) {
      console.log('delete Event')
      this.store.dispatch(new DeleteEvent(this.eventIdClicked)) // call action
      this.store.dispatch(new RejectDialogConfirmation()) // disable
    }
  }

}
