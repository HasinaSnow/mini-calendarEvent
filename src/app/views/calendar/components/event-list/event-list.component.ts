import { Component, Input, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { IEventCard } from 'src/app/core/models/event.model';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() events: Signal<IEventCard[]>
  @Input() dateSelected: Signal<number>
  @Input() monthSelected: Signal<number>
  @Input() yearSelected: Signal<number>
  fullDate: Signal<Date> = computed(() => new Date(this.yearSelected(), this.monthSelected(), this.dateSelected()))

  private modalService = inject(DialogService)
  modalRef: DynamicDialogRef | undefined

  showAddEventModal() {
    this.modalRef = this.modalService.open(EventDetailComponent, {
        data: { date: this.fullDate },
        header: 'Create the Event',
        width: '75%',
        height: '75%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
    });
  }

  showEventDedailModal(eventId: number) {
    this.modalRef = this.modalService.open(EventDetailComponent, {
      data: { eventId: eventId },
      header: 'Event detail',
      width: '75%',
      height: '75%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
  }
}
