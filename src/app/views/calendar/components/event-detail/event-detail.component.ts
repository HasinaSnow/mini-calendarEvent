import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IEvent } from 'src/app/core/models/event.model';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarSelectors } from 'src/app/core/stores/calendar/calendar.selectors';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit{
  private config = inject(DynamicDialogConfig)
  private store = inject(Store)
  eventId: number = this.config.data.eventId
  event = toSignal(this.store.select(CalendarSelectors.getEventById(this.eventId))) 

  ngOnInit(): void {
    console.log(this.event())
  }
}
